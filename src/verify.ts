import jwt from 'jsonwebtoken';
import fetch from 'node-fetch';
import getPem from 'rsa-pem-from-mod-exp';

import { getItem, setItem } from './cache';
import { AzureJwks, VerifyOptions } from './interfaces';

/**
 * Get public key.
 *
 * @param jwksUri Json web key set URI.
 * @param kid Public key to get.
 */
function getPublicKey(jwksUri: string, kid: string) {
  let item = getItem(kid);

  if (item) {
    return Promise.resolve(item.value);
  }

  return fetch(jwksUri)
    .then<AzureJwks>(res => res.json())
    .then(res => {
      res.keys.forEach(key => {
        setItem(key.kid, getPem(key.n, key.e));
      });

      item = getItem(kid);

      if (!item) {
        throw new Error('Could not find public key');
      }

      return item.value;
    });
}

/**
 * Verify token.
 *
 * @param token Token to verify.
 * @param options Configuration options.
 */
export function verify(token: string, options: VerifyOptions) {
  const { jwksUri, audience, issuer } = options;
  let decoded: { [key: string]: any; };
  let kid: string;

  try {
    decoded = jwt.decode(token, { complete: true, json: true });
    kid = decoded.header.kid;
  } catch (error) {
    return Promise.reject(error);
  }

  return getPublicKey(jwksUri, kid)
    .then(key => jwt.verify(token, key, {
      algorithms: ['RS256'],
      audience,
      issuer
    }));
};

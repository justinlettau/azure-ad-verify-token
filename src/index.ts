import jwt from 'jsonwebtoken';
import fetch from 'node-fetch';
import getPem from 'rsa-pem-from-mod-exp';

import { AzureJwksUri, VerifyConfig } from './interfaces';

/**
 * Public key cache.
 */
const cache = new Map<string, string>();

/**
 * Get public key.
 *
 * @param jwksUri Json web key set URI.
 * @param kid Public key to get.
 */
function getPublicKey(jwksUri: string, kid: string) {
  let publicKey = cache.get(kid);

  if (publicKey) {
    return Promise.resolve(publicKey);
  }

  return fetch(jwksUri)
    .then<AzureJwksUri>(res => res.json())
    .then(res => {
      res.keys.forEach(item => {
        cache.set(item.kid, getPem(item.n, item.e));
      });

      publicKey = cache.get(kid);

      if (!publicKey) {
        throw new Error('Could not find public key');
      }

      return publicKey;
    });
}

/**
 * Verify token.
 *
 * @param token Token to verify.
 * @param config Configuration options.
 */
export function verify(token: string, config: VerifyConfig) {
  const { jwksUri, audience, issuer } = config;
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

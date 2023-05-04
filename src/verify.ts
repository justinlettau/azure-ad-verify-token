import { decode as jwtDecode, verify as jwtVerify } from 'jsonwebtoken';
import fetch from 'node-fetch';
import getPem from 'rsa-pem-from-mod-exp';

import { getItem, setDeferredItem, setItem } from './cache.js';
import { AzureJwks, VerifyOptions } from './interfaces.js';

/**
 * Get public key.
 *
 * @param jwksUri Json web key set URI.
 * @param kid Public key to get.
 */
function getPublicKey(jwksUri: string, kid: string) {
  let item = getItem(kid);

  if (item) {
    return item.result;
  }

  // immediately defer to prevent duplicate calls to get jwks
  setDeferredItem(kid);

  return fetch(jwksUri)
    .then((res) => res.json() as Promise<AzureJwks>)
    .then((res) => {
      res.keys.forEach((key) => {
        const existing = getItem(key.kid);
        const pem: string = getPem(key.n, key.e);

        if (existing && existing.done) {
          // deferred item
          existing.done(pem);
        } else {
          setItem(key.kid, pem);
        }
      });

      item = getItem(kid);

      if (!item) {
        throw new Error('public key not found');
      }

      return item.result;
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let decoded: { [key: string]: any };
  let kid: string;

  try {
    decoded = jwtDecode(token, { complete: true, json: true });
    kid = decoded.header.kid;

    if (!kid) {
      throw new Error('kid missing from token header');
    }
  } catch (error) {
    return Promise.reject('invalid token');
  }

  return getPublicKey(jwksUri, kid).then((key) =>
    jwtVerify(token, key, {
      algorithms: ['RS256'],
      audience,
      issuer,
    })
  );
}

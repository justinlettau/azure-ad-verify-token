import nock from 'nock';

import { jsonWebKey } from '../testing/mock-json-web-key.js';
import {
  encodedValid,
  encodedWithoutKid,
  payload,
} from '../testing/mock-token.js';
import { clear } from './cache.js';
import { VerifyOptions } from './interfaces.js';
import { verify } from './verify.js';

describe('verify method', () => {
  let options: VerifyOptions;

  beforeEach(() => {
    nock.disableNetConnect();
    options = {
      jwksUri: 'https://login.microsoftonline.com/common/discovery/v2.0/keys',
      issuer: 'https://login.microsoftonline.com/{tenantid}/v2.0',
      audience: '6e74172b-be56-4843-9ff4-e66a39bb12e3',
    };
  });

  afterEach(() => {
    nock.cleanAll();
    clear();
  });

  it('should return decoded token when valid', async () => {
    nock(options.jwksUri)
      .get(() => true)
      .once()
      .reply(200, { keys: [jsonWebKey] });

    const result = await verify(encodedValid, options);

    expect(result).toEqual(payload);
  });

  it('should cache http requests', async () => {
    nock(options.jwksUri)
      .get(() => true)
      .once()
      .reply(200, { keys: [jsonWebKey] });

    verify(encodedValid, options);
    const result = await verify(encodedValid, options);

    expect(result).toEqual(payload);
  });

  it('should return error when token invalid', async () => {
    const result = verify('invalid_token', options);

    await expect(result).rejects.toBe('invalid token');
  });

  it('should return error when kid is missing', async () => {
    const result = verify(encodedWithoutKid, options);

    await expect(result).rejects.toBe('invalid token');
  });
});

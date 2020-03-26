/// <reference types="./typings" />
import nock from 'nock';

import { jsonWebKey } from '../testing/mock-json-web-key';
import { encoded, payload } from '../testing/mock-token';
import { VerifyOptions } from './interfaces';
import { verify } from './verify';

describe('verify method', () => {
  let options: VerifyOptions;

  beforeEach(() => {
    options = {
      jwksUri: 'https://login.microsoftonline.com/common/discovery/v2.0/keys',
      issuer: 'https://login.microsoftonline.com/{tenantid}/v2.0',
      audience: '6e74172b-be56-4843-9ff4-e66a39bb12e3'
    };
  });

  it('should return decoded token when valid', async () => {
    nock(options.jwksUri)
      .get(() => true)
      .once()
      .reply(200, { keys: [jsonWebKey] });

    const result = await verify(encoded, options);

    expect(result).toEqual(payload);
  });

  it('should return error when token invalid', async () => {
    const result = verify('invalid_token', options);

    await expectAsync(result).toBeRejected();
  });
});

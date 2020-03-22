/// <reference types="./typings" />
import nock from 'nock';

import { verify } from '.';
import { jsonWebKey } from '../testing/mock-json-web-key';
import { encoded, payload } from '../testing/mock-token';
import { VerifyConfig } from './interfaces';

describe('verify method', () => {
  let config: VerifyConfig;

  beforeEach(() => {
    config = {
      jwksUri: 'https://login.microsoftonline.com/common/discovery/v2.0/keys',
      issuer: 'https://login.microsoftonline.com/{tenantid}/v2.0',
      audience: '6e74172b-be56-4843-9ff4-e66a39bb12e3'
    };

    nock(config.jwksUri)
      .get(() => true)
      .reply(200, { keys: [jsonWebKey] });
  });

  it('should return decoded token when valid', async () => {
    const result = await verify(encoded, config);

    expect(result).toEqual(payload);
  });

  it('should return error when token invalid', async () => {
    const result = verify('invalid_token', config);

    await expectAsync(result).toBeRejected();
  });
});

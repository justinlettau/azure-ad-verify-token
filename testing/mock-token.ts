import * as fs from 'fs';
import jwt from 'jsonwebtoken';

export const header = {
  typ: 'JWT',
  alg: 'RS256',
  kid: 'i6lGk3FZzxRcUb2C3nEQ7syHJlY',
};

export const payload = {
  aud: '6e74172b-be56-4843-9ff4-e66a39bb12e3',
  iss: 'https://login.microsoftonline.com/{tenantid}/v2.0',
  iat: 1537231048,
  nbf: 1537231048,
  aio:
    'AXQAi/8IAAAAtAaZLo3ChMif6KOnttRB7eBq4/DccQzjcJGxPYy/C3jDaNGxXd6wNIIVGRghNRnwJ1lOcAnNZcjvkoyrFxCttv33140RioOFJ4bCCGVuoCag1uOTT22222gHwLPYQ/uf79QX+0KIijdrmp69RctzmQ==',
  azp: '6e74172b-be56-4843-9ff4-e66a39bb12e3',
  azpacr: '0',
  name: 'Abe Lincoln',
  oid: '690222be-ff1a-4d56-abd1-7e4f7d38e474',
  preferred_username: 'abeli@microsoft.com',
  rh: 'I',
  scp: 'access_as_user',
  sub: 'HKZpfaHyWadeOouYlitjrI-KffTm222X5rrV3xDqfKQ',
  tid: '72f988bf-86f1-41af-91ab-2d7cd011db47',
  uti: 'fqiBqXLPj0eQa82S-IYFAA',
  ver: '2.0',
};

const privateKey = fs.readFileSync(__dirname + '/rsa-private.pem', {
  encoding: 'utf8',
});

export const encoded = jwt.sign(payload, privateKey, {
  algorithm: 'RS256',
  header,
});

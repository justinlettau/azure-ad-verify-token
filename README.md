[![npm version](https://badge.fury.io/js/@tmaguire%2Fazure-ad-verify-token.svg)](https://badge.fury.io/js/@tmaguire%2Fazure-ad-verify-token)
[![CI](https://github.com/tmaguire/azure-ad-verify-token/workflows/CI/badge.svg)](https://github.com/tmaguire/azure-ad-verify-token/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/tmaguire/azure-ad-verify-token/branch/main/graph/badge.svg?token=D6Y449JK0D)](https://codecov.io/gh/tmaguire/azure-ad-verify-token)

# Azure AD Verify Token

Verify JWT issued by Azure Active Directory B2C.

> This fork is maintained by [@tmaguire](https://github.com/tmaguire) - this module was originally created by [@justinlettau](https://github.com/justinlettau).

# Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [References](#references)
- [Development](#development)

# Features

- 🎉 **Verify JWT** issued by Azure Active Directory B2C.
- 🚀 Automatically use the **rotated public keys** from Azure.
- 💪 Written in **TypeScript**.
- ♻️ **Configurable cache** for public keys.

# Installation

```bash
npm install @tmaguire/azure-ad-verify-token --save
```

# Usage

### Verify

```ts
import { verify, VerifyOptions } from '@tmaguire/azure-ad-verify-token';

const options: VerifyOptions = {
  jwksUri:
    'https://contoso.b2clogin.com/contoso.onmicrosoft.com/discovery/v2.0/keys?p=b2c_1_signupsignin1',
  issuer:
    'https://contoso.b2clogin.com/3285c484-dce5-4abb-a341-bbe4f2bc8554/v2.0/',
  audience: '99d1275c-e805-483f-b832-600f8130829c',
};

verify(token, options)
  .then((decoded) => {
    // verified and decoded token
    console.log(decoded);
  })
  .catch((error) => {
    // invalid token
    console.error(error);
  });
```

Verify options:

| Property   | Type     | Description                                                 |
| ---------- | -------- | ----------------------------------------------------------- |
| `jwksUri`  | `string` | `jwk_uri` value obtained from B2C policy metadata endpoint. |
| `issuer`   | `string` | `issuer` value obtained from B2C policy metadata endpoint.  |
| `audience` | `string` | Application ID of the application accessing the tenant.     |

Example metadata endpoints:

- https://login.microsoftonline.com/common/.well-known/openid-configuration
- https://login.microsoftonline.com/common/discovery/keys

### Configuration

```ts
import { setConfig } from '@tmaguire/azure-ad-verify-token';

setConfig({
  cacheLifetime: 12 * (60 * 60 * 1000), // 12 hours
});
```

Configuration options:

| Property        | Type     | Description                                  | Default |
| --------------- | -------- | -------------------------------------------- | ------- |
| `cacheLifetime` | `number` | Number of milliseconds to cache public keys. | 1 hour  |

# References

- [Overview of tokens in Azure Active Directory B2C](https://docs.microsoft.com/en-us/azure/active-directory-b2c/tokens-overview)
- [Microsoft identity platform access tokens](https://docs.microsoft.com/en-us/azure/active-directory/develop/access-tokens)
- [RSA Key Converter](https://superdry.apphb.com/tools/online-rsa-key-converter)

# Development

```
npm install
npm run build
```

/**
 * Verify configuration.
 */
export interface VerifyConfig {
  jwksUri: string;
  issuer: string;
  audience: string;
}

/**
 * Azure `jwks_uri` response.
 */
export interface AzureJwksUri {
  keys: AzureJwksUriKey[];
}

/**
 * Azure `jwks_uri` response key.
 */
export interface AzureJwksUriKey {
  kid: string;
  nbf: number;
  use: string;
  kty: string;
  e: string;
  n: string;
}

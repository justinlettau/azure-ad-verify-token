/**
 * Verify configuration.
 */
export interface VerifyConfig {
  jwksUri: string;
  issuer: string;
  audience: string;
}

/**
 * Azure json web key set.
 */
export interface AzureJwks {
  keys: AzureJwk[];
}

/**
 * Azure json web key.
 */
export interface AzureJwk {
  kid: string;
  nbf: number;
  use: string;
  kty: string;
  e: string;
  n: string;
}

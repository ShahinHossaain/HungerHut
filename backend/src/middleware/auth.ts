import { auth } from "express-oauth2-jwt-bearer";

export const jwtCheck = auth({
    audience: process.env.AUTHO_AUDIENCE,
    issuerBaseURL: process.env.AUTHO_ISSUER_BASE_URL,
    tokenSigningAlg: 'RS256'
  });

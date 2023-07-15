import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

const createJwtToken = (
  payload: Record<string, unknown>,
  secret: Secret,
  expairy: string
): string => {
  return jwt.sign(payload, secret, { expiresIn: expairy });
};

const verifyToken = (token: string, secret: Secret): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload;
};
export const jwtHelpers = { createJwtToken, verifyToken };

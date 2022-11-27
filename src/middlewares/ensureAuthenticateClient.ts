import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

export async function ensureAuthenticateClient(request: Request, _response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error('Token missing', { cause: 401 });
  }

  const [_, token] = authHeader.split(' ');

  try {
    const { sub } = verify(token, '559cd6f7a6d074b19ca25bbee02da10e');

    request.body.id_client = sub;

    return next();
  } catch (err) {
    throw new Error('Invalid token', { cause: 401 });
  }
}

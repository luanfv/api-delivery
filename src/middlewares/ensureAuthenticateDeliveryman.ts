import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

export async function ensureAuthenticateDeliveryman(request: Request, _response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error('Token missing', { cause: 401 });
  }

  const [_, token] = authHeader.split(' ');

  try {
    const { sub } = verify(token, '4191c3c093349c74ff5d1312f34ba8ce');

    request.body.id_deliveryman = sub;

    return next();
  } catch (err) {
    throw new Error('Invalid token', { cause: 401 });
  }
}

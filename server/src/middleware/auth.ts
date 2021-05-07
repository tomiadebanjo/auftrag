import { Response, NextFunction } from 'express';
import { UnauthorizedError } from '../utils/exceptions';
import { AuthRequest } from '../models/auth';
import { auth } from '../config/firebase';

export default class AuthMiddleware {
  static async verifyTokenId(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const authorizationToken = req.get('authorization');
      if (!authorizationToken) {
        throw new UnauthorizedError('Auth token is required');
      }
      const idToken = authorizationToken.split('Bearer ')[1];
      const decodedToken = await auth.verifyIdToken(idToken);
      req.decoded = { uid: decodedToken.uid };

      next();
    } catch (error) {
      if (error.code === 'auth/id-token-expired') {
        return next(new UnauthorizedError('Auth token is invalid'));
      }
      next(error);
    }
  }
}

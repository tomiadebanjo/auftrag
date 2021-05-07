import { Request } from 'express';

export interface AuthRequest extends Request {
  decoded?: {
    uid?: string;
  };
}

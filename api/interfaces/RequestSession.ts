import { Request } from 'express';

export default interface RequestSession extends Request {
  session?: {
    save: ping,
    userId: string
  }
};
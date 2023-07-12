import { Request } from 'express';

export default interface RequestSession extends Request {
  session?: {
    save: ping;
    destroy: ping;
    userId: string;
    file: Express.Multer.File;
  }
};

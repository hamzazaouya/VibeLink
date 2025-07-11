// express.d.ts
import { IUser, password } from './user.interface';


declare global {
  namespace Express {
    interface Request {
      session: {
        user?: IUser;
        password?: string;
      };
    }
  }
}

declare namespace Express {
  export interface User extends IUser {}
}
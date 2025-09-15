/*****************************************************

 * @fileoverview user authentication
 * @author hazaouya
 * @version 1.0.0
 * @created 2024-10-21

 *******************************************************/

import { Request, Response, NextFunction } from 'express';
import { IUser } from '../types/user.interface';
import CONST from '../utils/constants'

/*******************************************************************
 * @function  function authenticate
 * @discription check for user authority to access global page
 * @created 2024-10-21
 * @version 1.0.0
 * @auther hzaouya
*******************************************************************/

function authenticate(req: Request, res: Response, next: NextFunction): void {
  console.log("Hello From backend =====> ", req.session);
  if (req.session) { 
    if (!req.session.user) {
      res.status(CONST.UNAUTHORIZED).send("You are not allowed to access this Page");
      return;
    }
    next();
  } else {
    res.status(CONST.SERVER_ERROR).json({message: "server error"});
  }
}


/*******************************************************************

 * @function  function authEmailVerification
 * @discription check for user authority to access Email Verification page
 * @created 2024-10-30
 * @version 1.0.0
 * @auther hazaouya

 *******************************************************************/


function authEmailVerification(req: Request, res: Response, next: NextFunction): void {
  if (req.session) {
    if (!req.session.user) {
      return res.redirect("/login");
    }

    const user = req.session.user as IUser;

    if (user.is_verified && user.is_registred) {
      return res.redirect("/");
    }

    if (user.is_verified) {
      return res.redirect("/regester");
    }
    
    next();
  }
}


/*******************************************************************

 * @function  function name
 * @discription check for user authority to access user Regestration page.
 * @created 2024-10-30
 * @version 1.0.0
 * @auther hazaouya

 *******************************************************************/

function authUserRegestration(req: Request, res: Response, next: NextFunction): void {
  if (req.session) {
    if (!req.session.user) {
      return res.redirect("/login");
    }
  
    const user = req.session.user as IUser;
  
    if (user.is_verified && user.is_registred) {
      return res.redirect("/");
    }
  
    if (!user.is_verified) {
      return res.redirect("/verify/email");
    }
    
    next();
  }
}

export default { authenticate, authEmailVerification, authUserRegestration };
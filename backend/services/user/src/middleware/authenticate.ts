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
  if (req.session) {
    if (!req.session.user) {
      return res.redirect("/login"); // Redirect to login if the session doesn't exist
    }

    const user = req.session.user as IUser;
    
    if (!user.is_verified && !user.is_registred) {
      return res.redirect("/verify/email"); // Redirect to verify email if not verified
    }
  
    if (!user.is_registred) {
      return res.redirect("/regester"); // Redirect to info registration if not registered
    }
    
    next();
  }
  res.status(CONST.SERVER_ERROR).json({message: "server error"});
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
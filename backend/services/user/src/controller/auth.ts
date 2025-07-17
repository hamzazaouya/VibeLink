/******************************************
 * @fileoverview Defines and exports authentication-related controllers.
 * @author Hamza ZAOUYA
 * @version 1.0.0
 * @created 2024-10-23
 ******************************************/

import { Request, Response } from "express";
import authService from "../service/auth";
import logger from "../utils/logger";
import CONST from "../utils/constants";
import { IUser } from "../types/user.interface";

/*******************************************************************

 * @function  function name
 * @discription Function description
 * @created 2024-11-19
 * @version 1.0.0
 * @auther Function description

 *******************************************************************/

async function logout(req: Request, res: Response): Promise<void> {
  try {
    if (req.session) {
      delete req.session.user;
      res
        .status(CONST.SUCCESS)
        .json({ message: "user logged out successflly" });
    }
  } catch {
    res.status(CONST.SERVER_ERROR).json({ message: "server error" });
  }
}

/*******************************************************************
 * @function  function login(req, res)
 * @discription Attempts to log in the user with the provided email and password.
 *              If user found, stores the user (id, is_verified, is_registred) in the session.
 *              If user not regested or email not verifyed rederect to the next step
 * @created 2024-10-23
 * @version 1.0.0
 * @auther hazaouya
 *******************************************************************/

async function login(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body;
  try {
    const user: IUser = await authService.login(email, password);
    if (req.session) {
      req.session.user = user;
      console.log(req.session);
      res.status(CONST.SUCCESS).json({ message: "user logged successfully" });
    }
  } catch (error: any) {
    logger.user.info(`${req.ip}: ${error}`);
    if (error.message === "wrong username or password")
      res.status(CONST.UNAUTHORIZED).json({ message: error.message });
    else if (error.message === "user not found")
      res.status(CONST.NOT_FOUND).json({ message: error.message });
    else res.status(CONST.SERVER_ERROR).json({ message: "server error" });
  }
}

/*******************************************************************

 * @function  function signup
 * @discription Function description
 * @created 2024-10-30
 * @version 1.0.0
 * @auther Function description

 *******************************************************************/

async function signup(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body;

  try {
    const user: IUser = await authService.signup(email, password);
    if (req.session) {
      req.session.user = user;
      res.status(CONST.CREATED).json({ message: "user created successfully" });
    }
  } catch (error: any) {
    if (error.message.includes("email"))
      res.status(CONST.CONFLICT).json({ message: "email is already taken" });
    else res.status(CONST.SERVER_ERROR).json({ message: "server error" });
  }
}

/*******************************************************************

 * @function  function name
 * @discription Function description
 * @created 2024-11-01
 * @version 1.0.0
 * @auther Function description

 *******************************************************************/

async function verifyEmailLink(req: Request, res: Response): Promise<void> {
  const { id } = req.params;

  try {
    if (req.session && id === req.session.user.verif_email_id) {
      await authService.verifyEmail(req.session.user.id);
      req.session.user.is_verified = true;
      res
        .status(CONST.SUCCESS)
        .json({ message: "email verified successfully" });
    } else
      res.status(CONST.UNAUTHORIZED).json({ message: "email not verified" });
  } catch (error: any) {
    res.status(CONST.SERVER_ERROR).json({ message: "server error" });
  }
}

/*******************************************************************

 * @function  function name
 * @discription Function description
 * @created 2024-11-01
 * @version 1.0.0
 * @auther Function description

 *******************************************************************/

async function verifyEmailCode(req: Request, res: Response): Promise<void> {
  const { code } = req.body;

  try {
    if (req.session && code === req.session.user.verif_email_code) {
      await authService.verifyEmail(req.session.user.id);
      req.session.user.is_verified = true;
      res
        .status(CONST.SUCCESS)
        .json({ message: "email verified successfully" });
    } else
      res.status(CONST.UNAUTHORIZED).json({ message: "email not verified" });
  } catch (error: any) {
    res.status(CONST.SERVER_ERROR).json({ message: "server error" });
  }
}

/*******************************************************************

 * @function  function discordAuth
 * @discription Function description
 * @created 2024-11-11
 * @version 1.0.0
 * @auther Function description

 *******************************************************************/

async function discordAuth(req: Request, res: Response): Promise<void> {
  if (req.session) {
    req.session.user = req.user;
    res.redirect("/");
  }
}

export default {
  login,
  signup,
  verifyEmailLink,
  verifyEmailCode,
  discordAuth,
  logout,
};

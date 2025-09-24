/*****************************************************

 * @fileoverview Defines and exports authentication-related services.
 * @author 
 * @version 1.0.0
 * @created 2024-10-23

 *******************************************************/



import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import userDAO from '../database/user';
import { IUser } from '../types/user.interface';
import { UserCredentials, UserInfo } from '../types/user.interface';
import {generateVerificationCode} from '../utils/hash';
import redisClient from '../utils/redisClient';

/*******************************************************************

 * @function  function login
 * @discription check for user regestration
 * @created 2024-10-23
 * @version 1.0.0
 * @auther hazaouya

 *******************************************************************/

async function login(email: string, password: string): Promise<IUser> {
    const user_info: UserCredentials = await userDAO.findUserByEmail(email);
    const pasword_check:boolean = await bcrypt.compare(password, user_info.password_hash);

    if (pasword_check) {
        const user: IUser = {id: user_info.id, is_verified: user_info.is_verified, is_registred: user_info.is_registred}
        return user;
    }
    throw new Error("wrong username or password");
}


/*******************************************************************

 * @function  function name
 * @discription Function description
 * @created 2024-10-26
 * @version 1.0.0
 * @auther Function description

 *******************************************************************/


async function signup(username: string, email: string, password: string): Promise<IUser> {
    username = username.toLowerCase();
    email = email.toLocaleLowerCase();
    await userDAO.isUserNameExists(username);
    await userDAO.isEmailExists(email);
    const user: IUser = await userDAO.signupUser(username, email, password);
    return user;
}


/*******************************************************************

 * @function  function verifyEmail
 * @discription Function description
 * @created 2024-11-01
 * @version 1.0.0
 * @auther Function description

 *******************************************************************/



async function verifyEmail(user_id: string): Promise<void> {
    return await userDAO.verifyUserEmail(user_id);
}

async function getUserIdFromToken(email_id: string): Promise<string>{
    const redisKeyEmailID = `email_verif_id:${email_id}`;
    const user_id = await redisClient.get(redisKeyEmailID);

    if (!user_id) {
        throw new Error("Link invalid Or Expired");
    }
    await redisClient.del(redisKeyEmailID);
    return user_id;
}

async function getUserCodeFromToken(user_id: string, code: string): Promise<void> {
    const redisKeyEmailCode = `email_verif_code:${user_id}`;
    const email_code = await redisClient.get(redisKeyEmailCode);

    if(!email_code || code != email_code) {
        throw new Error("Code invalid or Expired")
    }
    await redisClient.del(redisKeyEmailCode);
}


async function generateEmailVerifTokens(user_id: string) {
    const email_id = uuidv4();
    const email_code = generateVerificationCode();
    const VERIFICATION_RESEND = "verification_resend";
    const VERIFICATION_PREFIX_EMAIL_ID = "email_verif_id";
    const VERIFICATION_PREFIX_EMAIL_CODE = "email_verif_code";
    const redisKeyEmailID = `${VERIFICATION_PREFIX_EMAIL_ID}:${email_id}`;
    const redisKeyEmailCode = `${VERIFICATION_PREFIX_EMAIL_CODE}:${user_id}`;
    const redisKeyResend = `${VERIFICATION_RESEND}:${user_id}`
    const EXPIRATION_TIME = 10 * 60;

    const existing = await redisClient.get(redisKeyResend);
    if (existing) {
        const ttl = await redisClient.ttl(redisKeyResend);
        throw new Error(`Please wait ${ttl}s before resending`);
    }

    await redisClient.set(redisKeyEmailID, user_id, { EX: EXPIRATION_TIME });
    await redisClient.set(redisKeyEmailCode, email_code, { EX: EXPIRATION_TIME });
    await redisClient.set(redisKeyResend, '1', {EX: EXPIRATION_TIME});

    return { email_id, email_code };
}

async function userInfo(user_id: string): Promise<UserInfo> {
    return await userDAO.userInfo(user_id);
}


export default { login, signup, verifyEmail, userInfo, generateEmailVerifTokens, getUserIdFromToken, getUserCodeFromToken};
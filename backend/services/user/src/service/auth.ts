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
import { UserCredentials, UserStatus } from '../types/user.interface';
import generateVerificationCode from '../utils/hash';

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
        if (!user_info.is_verified) {
            user.verif_email_id = uuidv4();
            user.verif_email_code = generateVerificationCode();
        }
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
    user.verif_email_id = uuidv4();
    user.verif_email_code = generateVerificationCode();
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

async function userStatus(user_id: string): Promise<UserStatus> {
    return await userDAO.userStatus(user_id);
}



export default { login, signup, verifyEmail, userStatus };
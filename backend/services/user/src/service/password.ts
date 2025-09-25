/*****************************************************

 * @fileoverview Description of the file
 * @author 
 * @version 1.0.0
 * @created 2024-11-15

 *******************************************************/

import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import passwordDAO from "../database/password";
import {generateVerificationCode} from '../utils/hash';
import {password} from "../types/user.interface"

async function changeUserPassword(user_id: string, oldPassword: string, newPassword: string): Promise<void> {
    const password_hash:string = await passwordDAO.getUserPassword(user_id);
    const match:boolean = await bcrypt.compare(oldPassword, password_hash);
    if(match) {
        return await passwordDAO.updateUserPassword(user_id, newPassword);
    }
    throw new Error("passwords not matched");
}

/*******************************************************************

 * @function  function name
 * @discription Function description
 * @created 2024-11-16
 * @version 1.0.0
 * @auther Function description

 *******************************************************************/



async function generateVerificationCredentials(email: string) : Promise<password> {
    const user_id = await passwordDAO.isEmailExists (email);
    const password: password = {
        user_id: user_id,
        verif_id: uuidv4(),
        verif_code: generateVerificationCode()
    };
    return password;
}


/*******************************************************************

 * @function  function name
 * @discription Function description
 * @created 2024-11-17
 * @version 1.0.0
 * @auther Function description

 *******************************************************************/

async function changePassword(user_id: string, newPassword: string): Promise<void> {
    return await passwordDAO.updateUserPassword(user_id, newPassword);
}

export default {changeUserPassword, generateVerificationCredentials, changePassword};
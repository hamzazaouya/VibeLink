/*****************************************************

 * @fileoverview Description of the file
 * @author 
 * @version 1.0.0
 * @created 2024-11-11

 *******************************************************/



import { v4 as uuidv4 } from 'uuid';
import discordDAO from '../database/discord';
import generateVerificationCode from '../utils/hash';
import { IUser } from '../types/user.interface';

/*******************************************************************

 * @function  function name
 * @discription Function description
 * @created 2024-11-03
 * @version 1.0.0
 * @auther Function description

 *******************************************************************/

async function signup(discord_id: string, email: string): Promise<IUser> {
    const user = await discordDAO.signup(email, discord_id);
    if (!user.is_verified) {
        user.verif_email_id = uuidv4();
        user.verif_email_code = generateVerificationCode();
    }
    return user;
}


/*******************************************************************

 * @function  function name
 * @discription Function description
 * @created 2024-11-11
 * @version 1.0.0
 * @auther Function description

 *******************************************************************/

async function isUserExists(discord_id: string): Promise<boolean> {
    return await discordDAO.isDiscordIdExists(discord_id);
}

/*******************************************************************

 * @function  function name
 * @discription Function description
 * @created 2024-11-11
 * @version 1.0.0
 * @auther Function description

 *******************************************************************/


async function getUser(discord_id: string): Promise<IUser> {
    const user: IUser = await discordDAO.getUser(discord_id);
    if (!user.is_verified) {
        user.verif_email_id = uuidv4();
        user.verif_email_code = generateVerificationCode();
    }
    return user;
}


/*******************************************************************

 * @function  function name
 * @discription Function description
 * @created 2024-11-11
 * @version 1.0.0
 * @auther Function description

 *******************************************************************/



async function isEmailExists(email: string): Promise<boolean> {
    return discordDAO.isEmailExists(email);
}

export default { signup, isUserExists, getUser, isEmailExists };
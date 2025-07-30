/*****************************************************

 * @fileoverview Description of the file
 * @author 
 * @version 1.0.0
 * @created 2024-11-03

 *******************************************************/

import { v4 as uuidv4 } from 'uuid';
import logger from '../utils/logger';
import pool  from '../utils/postgreSQL_conf';
import { IUser } from '../types/user.interface';
import query from '../utils/queryEngine';

/*******************************************************************

 * @function  function name
 * @discription Function description
 * @created 2024-11-04
 * @version 1.0.0
 * @auther Function description

 *******************************************************************/

async function isDiscordIdExists(discord_id: string): Promise<boolean> {
    try {
      const { rowCount } = await query.select(null, 'users', [{column:'discord_id', operator:'=', value: discord_id}]);
      if (rowCount && rowCount > 0)
        return true;
      return false;
    } catch (error) {
      logger.user.error('Error finding user by Discord ID:', error);
      throw error;
    }
}


/*******************************************************************

 * @function  function name
 * @discription Function description
 * @created 2024-11-04
 * @version 1.0.0
 * @auther Function description

 *******************************************************************/


async function signup(username: string, discord_id: string): Promise<IUser> {
    try {
      const id = uuidv4();
      await query.insert('users', ['id', 'user_name', 'discord_id', 'signup_method', 'is_verified'], [id, username, discord_id, "discord", true])
      const user: IUser = { id, is_registred: true, is_verified: false };
      return user;
    } catch (error) {
      logger.user.error(error);
      throw error;
    }
  }

/*******************************************************************

 * @function  function name
 * @discription Function description
 * @created 2024-11-04
 * @version 1.0.0
 * @auther Function description

 *******************************************************************/

  async function isUserNameExists(username: string): Promise<boolean> {
    try {
      const { rowCount } = await query.select(null, 'users', [{column: 'user_name', operator:'=', value: username}]);
      if(rowCount && rowCount > 0)
        return true;
      return false;
    } catch (error) {
      logger.user.error(error);
      throw error;
    }
  }


/*******************************************************************

 * @function  function name
 * @discription Function description
 * @created 2024-11-12
 * @version 1.0.0
 * @auther Function description

 *******************************************************************/



async function getUser(discord_id: string): Promise<IUser> {
    try {
      const result = await query.select(null, 'users', [{column:'discord_id', operator:'=', value: discord_id}]);
      if (result.rows.length === 0) 
        throw new Error ("user not found");

      const user: IUser = {
        id: result.rows[0].id,
        is_registred: result.rows[0].is_registred,
        is_verified: result.rows[0].is_verified
      };
      return user;
    } catch (error) {
      logger.user.error(error);
      throw error;
    }
  }

export default { isDiscordIdExists, signup, isUserNameExists, getUser };

/*****************************************************

 * @fileoverview Description of the file
 * @author 
 * @version 1.0.0
 * @created 2024-11-03

 *******************************************************/

import { v4 as uuidv4 } from 'uuid';
import logger from '../utils/logger';
import pool  from '../utils/postgress_conf';
import { IUser } from '../types/user.interface';

/*******************************************************************

 * @function  function name
 * @discription Function description
 * @created 2024-11-04
 * @version 1.0.0
 * @auther Function description

 *******************************************************************/

async function isDiscordIdExists(discord_id: string): Promise<boolean> {
    try {
      const { rowCount } = await pool.query('SELECT * FROM users WHERE discord_id = $1', [discord_id]);
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


async function signup(email: string, discord_id: string): Promise<IUser> {
    try {
      const id = uuidv4();
      const insertUserQuery = 'INSERT INTO users (id, email, discord_id, signup_method) VALUES ($1, $2, $3, $4)';
      console.log("--------------->", id, email, discord_id, id.length, email.length, discord_id.length)
      await pool.query(insertUserQuery, [id, email, discord_id, "discord"]);
      logger.user.info('User email and discord_id inserted successfully');
      const user: IUser = { id, is_registred: false, is_verified: false };
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

  async function isEmailExists(email: string): Promise<boolean> {
    try {
      const { rowCount } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
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
      const result = await pool.query('SELECT * FROM users WHERE discord_id = $1', [discord_id]);
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

export default { isDiscordIdExists, signup, isEmailExists, getUser };

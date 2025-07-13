/*****************************************************

 * @fileoverview Description of the file
 * @author 
 * @version 1.0.0
 * @created 2024-11-15

 *******************************************************/

import pool from '../utils/postgreSQL_conf';
import logger from "../utils/logger";
import bcrypt from 'bcrypt';
import query from '../utils/queryEngine';
import { connectedUsers } from '../utils/socket';


/*******************************************************************

 * @function  function name
 * @discription Function description
 * @created 2024-11-15
 * @version 1.0.0
 * @auther Function description

 *******************************************************************/



async function getUserPassword(user_id: string): Promise<string> {
    try {
      
      // const query = 'SELECT password_hash FROM users WHERE id = $1';
      // const res = await pool.query(query, [user_id]);
      const result = await query.select(['password_hash'], 'users', [{column: 'id', operator: '=', value: user_id}]);
      if(result.rowCount === 0)
        throw new Error("user not found");
      const { password_hash } = result.rows[0];
      return password_hash;
    } catch (error) {
      logger.user.error(error);
      throw error;
    }
}


/*******************************************************************

 * @function  function name
 * @discription Function description
 * @created 2024-11-15
 * @version 1.0.0
 * @auther Function description

 *******************************************************************/



async function updateUserPassword(user_id: string, newPassword: string): Promise<void> {
    try {
        const password_hash = await bcrypt.hash(newPassword, 10);
        await query.update('users', ['password_hash '], [password_hash], 'id', user_id);
        // await pool.query("UPDATE users SET password_hash = $1 WHERE id = $2", [password_hash, user_id]);
    } catch(error) {
        logger.user.error(error);
        throw error;
    }
}


/*******************************************************************

 * @function  function name
 * @discription Function description
 * @created 2024-11-16
 * @version 1.0.0
 * @auther Function description

 *******************************************************************/


async function isEmailExists(email: string): Promise<string> {
  try {
    // const emailCheckQuery = 'SELECT id FROM users WHERE email = $1';
    // const result = await pool.query(emailCheckQuery, [email]);
    const result = await query.select(['id'], 'users', [{column: 'email', operator: '=', value: email}])
    if(result.rowCount === 0)
      throw new Error("user not exist");
    return result.rows[0].id;
  } catch (error) {
    throw error;
  }
}

export default { getUserPassword, updateUserPassword, isEmailExists};
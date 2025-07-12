/*****************************************************

 * @fileoverview Description of the file
 * @author hazaouya
 * @version 1.0.0
 * @created 2024-10-29

 *******************************************************/

import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import pool from '../utils/postgreSQL_conf';
import logger from "../utils/logger";
import { UserCredentials } from '../types/user.interface';
import { IUser } from '../types/user.interface';

/*******************************************************************

 * @function  function findUserByEmail
 * @discription Function description
 * @created 2024-10-29
 * @version 1.0.0
 * @auther hazaouya

 *******************************************************************/



async function findUserByEmail(email: string): Promise<UserCredentials> {
    try {
      const query = 'SELECT id, password_hash, is_registred, is_verified FROM users WHERE email = $1';
      const res = await pool.query(query, [email]);
      if(res.rowCount === 0)
      throw new Error("user not found");
      const { password_hash, id, is_registred, is_verified } = res.rows[0];
      const user: UserCredentials = { id, password_hash, is_registred, is_verified };
      return user;
    } catch (error) {
      logger.user.error(error);
      throw error;
    }
}

/*******************************************************************

 * @function  function registraterUser
 * @discription regester a new user with email and password.
 * @created 2024-10-29
 * @version 1.0.0
 * @auther hazaouya

 *******************************************************************/



async function signupUser(email: string, password: string): Promise<IUser> {
    try {
      const id = uuidv4();
      const password_hash = await bcrypt.hash(password, 10);
      const insertUserQuery = 'INSERT INTO users (id, email, password_hash) VALUES ($1, $2, $3)';
      await pool.query(insertUserQuery, [id, email, password_hash]);
      logger.user.info('User email and password inserted successfully');
      const user: IUser = { id, is_registred: false, is_verified: false };

      return user;
    } catch (error) {
      logger.user.error(error);
      throw error;
    }
  }


/*******************************************************************

 * @function  function verifyUserEmail
 * @discription Function description
 * @created 2024-11-01
 * @version 1.0.0
 * @auther Function description

 *******************************************************************/



async function verifyUserEmail(user_id: string): Promise<void> {
    try {
      const query = "UPDATE users SET is_verified = $1 WHERE id = $2";
      await pool.query(query, [true, user_id]);
    } catch (error) {
      logger.user.error(error);
      throw error;
    }
  }

/*******************************************************************

 * @function  function isEmailExists
 * @discription check for email is exists to other user
 * @created 2024-10-29
 * @version 1.0.0
 * @auther hazaouya
 *******************************************************************/

async function isEmailExists(email: string): Promise<void> {
    try {
      const emailCheckQuery = 'SELECT * FROM users WHERE email = $1';
      const { rowCount } = await pool.query(emailCheckQuery, [email]);
      if (rowCount && rowCount > 0) {
        logger.user.error(`Email: ${email} already exists`);
        throw new Error('Email already exists');
      }
    } catch (error) {
      logger.user.error(error);
      throw error;
    }
  }

  export default { findUserByEmail, signupUser, isEmailExists, verifyUserEmail };
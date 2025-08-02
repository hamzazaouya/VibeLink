import { v4 as uuidv4 } from 'uuid';
import logger from '../utils/logger';
import { IUser } from '../types/user.interface';
import query from '../utils/queryEngine';

async function isGoogleIdExists(google_id: string): Promise<boolean> {
    try {
      const { rowCount } = await query.select(null, 'users', [{column:'google_id', operator:'=', value: google_id}]);
      if (rowCount && rowCount > 0)
        return true;
      return false;
    } catch (error) {
      logger.user.error('Error finding user by Discord ID:', error);
      throw error;
    }
}

async function getUser(google_id: string): Promise<IUser> {
    try {
      const result = await query.select(null, 'users', [{column:'google_id', operator:'=', value: google_id}]);
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


async function signup(username: string, google_id: string): Promise<IUser> {
    try {
      const id = uuidv4();
      await query.insert('users', ['id', 'user_name', 'google_id', 'signup_method', 'is_verified'], [id, username, google_id, "google", true])
      const user: IUser = { id, is_registred: true, is_verified: false };
      return user;
    } catch (error) {
      logger.user.error(error);
      throw error;
    }
}

export default {isGoogleIdExists, getUser, isUserNameExists, signup}
/*****************************************************

 * @fileoverview Description of the file
 * @author 
 * @version 1.0.0
 * @created 2024-11-13

 *******************************************************/

import { v4 as uuidv4 } from 'uuid';
import pool from '../utils/postgreSQL_conf';
import logger from "../utils/logger";
import { IUser } from '../types/user.interface';
import query from '../utils/queryEngine';
import { Result } from 'express-validator';


/*******************************************************************

 * @function  function name
 * @discription Function description
 * @created 2024-11-13
 * @version 1.0.0
 * @auther Function description

 *******************************************************************/



async function registerUserInfo(user_id: IUser, firstName: string, lastName: string, age: number, gender:string, phone: string, bio: string, latitude : string, longitude : string, hobbies: string[]): Promise<void> {

    try {
        await query.update('users', ['first_name', 'last_name', 'age', 'gender', 'phone', 'bio'],
             [firstName, lastName, age, gender, phone, bio],
              'id', user_id );
        hobbies.forEach( async (hobbie) => {
            const result = await query.select(['id'], 'interests', [{column: 'interest', operator: '=', value: hobbie.toLocaleLowerCase()}]);
            const hobbie_id: string = result.rows[0].id;
            const user_interest_id: string = uuidv4();
            await query.insert('user_interest', ['id', 'user_id', 'interest_id'], [user_interest_id, user_id, hobbie_id]);
        });
    } catch (error) {
        logger.user.info(error);
        throw error;
    }
}


/*******************************************************************

 * @function  function name
 * @discription Function description
 * @created 2024-11-14
 * @version 1.0.0
 * @auther Function description

 *******************************************************************/



async function registerUserImages(user_id: IUser, profileImage: any, images: any[]) {
    try {
        images.forEach(async (picutre_info) => {
            const picture_id: string = uuidv4();
            const picutre_path: string = picutre_info.path;
            // await pool.query('INSERT INTO picture (id, user_id, picture_path) VALUES ($1, $2, $3)',[picture_id, user_id, picutre_path]);
            await query.insert('picture', ['id', 'user_id', 'picture_path'], [picture_id, user_id, picutre_path]);
        });
        const picture_id: string = uuidv4();
        const picutre_path: string = profileImage[0].path;
        // await pool.query('INSERT INTO picture (id, user_id, picture_path, is_profile_picture) VALUES ($1, $2, $3, $4)',[picture_id, user_id, picutre_path, true]);
        await query.insert('picture', ['id', 'user_id', 'picture_path', 'is_profile_picture'], [picture_id, user_id, picutre_path, true]);
    } catch (error) {
        logger.user.info(error);
        throw error;
    }
}


/*******************************************************************

 * @function  function name
 * @discription Function description
 * @created 2024-11-14
 * @version 1.0.0
 * @auther Function description

 *******************************************************************/



async function registerUser(user_id: IUser) {
    try {
        //  await pool.query('UPDATE users SET is_registred = $1 WHERE id = $2', [true, user_id]);
        query.update('users', ['is_registred'], [true], 'id', user_id);
    } catch (error) {
        logger.user.info(error);
        throw error;
    }
}

export default {registerUserInfo, registerUserImages, registerUser};
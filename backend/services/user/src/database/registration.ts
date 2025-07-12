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


/*******************************************************************

 * @function  function name
 * @discription Function description
 * @created 2024-11-13
 * @version 1.0.0
 * @auther Function description

 *******************************************************************/



async function registerUserInfo(user_id: IUser, firstName: string, lastName: string, userName: string, age: number, gender:string, phone: string, bio: string, latitude : string, longitude : string, hobbies: string[]): Promise<void> {

    try {
        let query = `UPDATE users SET first_name = $1, last_name = $2, user_name = $3, age = $4, gender = $5, phone = $6, bio = $7, location = ST_SetSRID(ST_MakePoint($8, $9), 4326)  WHERE id = $10 `;
        const values = [firstName, lastName, userName, age, gender, phone, bio, longitude, latitude, user_id];
        await pool.query(query, values);
        
        hobbies.forEach( async (hobbie) => {
            const res = await pool.query('select id from interests where interest = $1',[hobbie.toLocaleLowerCase()]);
            const hobbie_id: string = res.rows[0].id;
            const user_interest_id: string = uuidv4();
            await pool.query('INSERT INTO user_interest (id, user_id, interest_id) VALUES ($1, $2, $3)',[user_interest_id, user_id, hobbie_id]);
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
            await pool.query('INSERT INTO picture (id, user_id, picture_path) VALUES ($1, $2, $3)',[picture_id, user_id, picutre_path]); 
        });
        const picture_id: string = uuidv4();
        const picutre_path: string = profileImage[0].path;
        await pool.query('INSERT INTO picture (id, user_id, picture_path, is_profile_picture) VALUES ($1, $2, $3, $4)',[picture_id, user_id, picutre_path, true]); 
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
         await pool.query('UPDATE users SET is_registred = $1 WHERE id = $2', [true, user_id]);
    } catch (error) {
        logger.user.info(error);
        throw error;
    }
}

export default {registerUserInfo, registerUserImages, registerUser};
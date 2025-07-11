/*****************************************************

 * @fileoverview Description of the file
 * @author 
 * @version 1.0.0
 * @created 2024-11-17

 *******************************************************/

import pool from '../utils/postgress_conf';
import { v4 as uuidv4 } from 'uuid';
import { userImages, userMatches, userProfilInfo } from '../types/user.interface';
import { userInfo } from '../types/user.interface';

async function getUserInfo(user_id: string){
    let interests:string[] = [];
    try {
        let query = 'SELECT user_name, first_name, last_name, age, phone, bio, email FROM users WHERE id = $1';
        const res = await pool.query(query, [user_id]);
        if(res.rowCount && res.rowCount > 0) {
            query = "SELECT i.interest FROM user_interest ui JOIN interests i ON ui.interest_id = i.id WHERE ui.user_id = $1;"
            const user_interests = await pool.query(query, [user_id]);
            const user_info: userInfo = res.rows[0];
            user_interests.rows.forEach((e : any) => {
                interests.push(e.interest);
            });
            user_info.hobbies = interests;
            return user_info;
        }
        throw new Error ("user not found");
    } catch (error) {
        throw error;
    }
}


/*******************************************************************

 * @function  function name
 * @discription Function description
 * @created 2024-11-18
 * @version 1.0.0
 * @auther Function description

 *******************************************************************/

async function getUserEmail(user_id: string) {
    try {
        const res = await pool.query("SELECT email FROM users WHERE id = $1", [user_id]);
        if(res.rowCount && res.rowCount > 0) {
            const email = res.rows[0];
            return email;
        } else
            throw new Error ("user not found");
    } catch (error) {
        throw error;
    }
}


/*******************************************************************

 * @function  function name
 * @discription Function description
 * @created 2024-11-18
 * @version 1.0.0
 * @auther Function description

 *******************************************************************/

async function updateUserInfo(user_id: string, firstName: string, lastName: string, userName: string, age: number, phone: string, bio: string): Promise<void> {

    try {
        const query = `UPDATE users SET first_name = $1, last_name = $2, user_name = $3, age = $4, phone = $5, bio = $6  WHERE id = $ `;
        const values = [firstName, lastName, userName, age, phone, bio, user_id];
        await pool.query(query, values);
    } catch (error) {
        throw error;
    }
}


/*******************************************************************

 * @function  function name
 * @discription Function description
 * @created 2024-11-18
 * @version 1.0.0
 * @auther Function description

 *******************************************************************/

async function updateHobbies(user_id: string, hobbies: string[]) {
    try {
            await pool.query('DELETE FROM users WHERE user_id = $1', [user_id]);
            hobbies.forEach( async (hobbie) => {
            const res = await pool.query('select id from interests where interest = $1',[hobbie.toLocaleLowerCase()]);
            const hobbie_id: string = res.rows[0].id;
            const user_interest_id: string = uuidv4();
            await pool.query('INSERT INTO user_interest (id, user_id, interest_id) VALUES ($1, $2, $3)',[user_interest_id, user_id, hobbie_id]);
        });
    } catch (error) {
        throw error
    }
}


/*******************************************************************

 * @function  function name
 * @discription Function description
 * @created 2024-11-18
 * @version 1.0.0
 * @auther Function description

 *******************************************************************/

async function updateUserEmail(user_id: string, email:string) {
    try {
        await pool.query("UPDATE users SET email = $1, is_verified = $2 WHERE id = $3", [email, false, user_id]);
    } catch (error){
        throw error
    }
}


/*******************************************************************

 * @function  function name
 * @discription Function description
 * @created 2024-11-21
 * @version 1.0.0
 * @auther Function description

 *******************************************************************/

async function getProfileInfo(user_id: string): Promise<userProfilInfo> {
    let interests:string[] = [];
    try {
        let query = 'SELECT user_name, gender, bio, rating FROM users WHERE id = $1';
        const res = await pool.query(query, [user_id]);
        if(res.rowCount && res.rowCount > 0) {
            query = "SELECT i.interest FROM user_interest ui JOIN interests i ON ui.interest_id = i.id WHERE ui.user_id = $1;"
            const user_interests = await pool.query(query, [user_id]);
            user_interests.rows.forEach((e : any) => {
                interests.push(e.interest);
            });
            const user_info: userProfilInfo = {user_name: res.rows[0].user_name, gender: res.rows[0].gender, bio: res.rows[0].bio, rating: res.rows[0].rating, hobbies: interests};
            return user_info;
        }
        throw new Error ("user not found");
    } catch (error) {
        throw error;
    }
}

async function getUserProfileImages(user_id: string): Promise<userImages> {
    try {
        let query = "SELECT * FROM picture WHERE user_id = $1";
        const res = await pool.query(query, [user_id]);
        let profileImage:string = "";
        let images: string[] = [];
        res.rows.forEach((e) => {
            if(e.is_profile_picture)
                profileImage = e.picture_path;
            else
                images.push(e.picture_path);
        });
        const userImage: userImages = {profileImage: profileImage, images: images}
        return userImage;
    } catch (error) {
        throw error;
    }
}

async function userMatches(user_id: string): Promise<userMatches[] | null> {
    console.log("Hello from Database to check the images");
    try {
        const query = `
        SELECT 
            u.id AS user_id,
            u.user_name AS user_name,
            p.picture_path AS profile_picture
        FROM 
            matches m
        JOIN 
            users u ON m.match_id = u.id
        LEFT JOIN 
            picture p ON u.id = p.user_id AND p.is_profile_picture = TRUE
        WHERE 
            m.user_id = $1`;
        console.log(query);
        const res = await pool.query(query, [user_id]);
        let matches: userMatches [] = [];
        if(res.rowCount && res.rowCount > 0) {
            res.rows.forEach((e) => {
                matches.push(e);
            });
            return matches;
        }
        return null;
    } catch(error: any) {
        console.log("==========> ", error.message)
        throw error;
    }
}

export default {getUserInfo, getUserEmail, updateUserInfo, updateHobbies, updateUserEmail, getProfileInfo, getUserProfileImages, userMatches};
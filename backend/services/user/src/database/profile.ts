/*****************************************************

 * @fileoverview Description of the file
 * @author 
 * @version 1.0.0
 * @created 2024-11-17

 *******************************************************/

import pool from '../utils/postgreSQL_conf';
import { v4 as uuidv4 } from 'uuid';
import { UserImageGallery, userMatches, userProfilInfo, UserProfileVisite } from '../types/user.interface';
import { userInfo } from '../types/user.interface';
import query from '../utils/queryEngine';

async function getUserInfo(user_id: string){
    let interests:string[] = [];
    try {
        const res = await query.select(['user_name', 'first_name', 'last_name', 'age', 'phone', 'bio', 'email'],
            'users', [{column: 'id', operator: '=', value: user_id}]
        )
        // let query = 'SELECT user_name, first_name, last_name, age, phone, bio, email FROM users WHERE id = $1';
        // const res = await pool.query(query, [user_id]);
        if(res.rowCount && res.rowCount > 0) {
            // const query = "SELECT i.interest FROM user_interest ui JOIN interests i ON ui.interest_id = i.id WHERE ui.user_id = $1;"
            // const user_interests = await pool.query(query, [user_id]);
            const user_interests = await query.select(  
                ['i.interest'], 'user_interest ui',
                [{column: 'ui.user_id', operator: '=', value: user_id}], 
                [{type: 'INNER', table: 'interests i', on: 'ui.interest_id = i.id'}]
            );
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
        // const result = await pool.query("SELECT email FROM users WHERE id = $1", [user_id]);
        const result = await query.select(['email'], 'users', [{column: 'id', operator: '=', value: user_id}])
        if(result.rowCount && result.rowCount > 0) {
            const email = result.rows[0];
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
        // The user can Update only One field not all of them and that by selecting the user firstName | user.first_name
        // const query = `UPDATE users SET first_name = $1, last_name = $2, user_name = $3, age = $4, phone = $5, bio = $6  WHERE id = $ `;
        // const values = [firstName, lastName, userName, age, phone, bio, user_id];
        // await pool.query(query, values);
        await query.update('users', ['first_name', 'last_name', 'user_name', 'age', 'phone', 'bio'],
             [firstName, lastName, userName, age, phone, bio], 'id', user_id);
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
            // const result = await pool.query('select id from interests where interest = $1',[hobbie.toLocaleLowerCase()]);
            const result = await query.select(['id'], 'interests', [{column: 'interest', operator: '=', value: hobbie.toLocaleLowerCase()}]);
            const hobbie_id: string = result.rows[0].id;
            const user_interest_id: string = uuidv4();
            // await pool.query('INSERT INTO user_interest (id, user_id, interest_id) VALUES ($1, $2, $3)',[user_interest_id, user_id, hobbie_id]);
            query.insert('user_interest', ['id', 'user_id', 'interest_id'], [user_interest_id, user_id, hobbie_id]);
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
        // await pool.query("UPDATE users SET email = $1, is_verified = $2 WHERE id = $3", [email, false, user_id]);
        query.update('users', [email, 'is_verified'], [email, false], 'id', user_id);
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
        const res = await query.select(['user_name', 'gender', 'bio', 'rating', 'avatar'], 'users', [{column: 'id', operator: '=', value: user_id}]);
        if(res.rowCount && res.rowCount > 0) {
            const user_interests = await query.select(['i.interest'], 'user_interest ui',
                [{ column: 'ui.user_id', operator: '=', value: user_id}],
                [{ type: 'INNER', table: 'interests i', on: 'ui.interest_id = i.id'}]
                );

            user_interests.rows.forEach((e : any) => {
                interests.push(e.interest);
            });
            const user_info: userProfilInfo = {user_name: res.rows[0].user_name, gender: res.rows[0].gender, bio: res.rows[0].bio, rating: res.rows[0].rating, avatar: res.rows[0].avatar, hobbies: interests};
            return user_info;
        }
        throw new Error ("user not found");
    } catch (error) {
        throw error;
    }
}

async function getUserProfileImages(user_id: string): Promise<UserImageGallery[]> {
    try {
        const result = await query.select(null, 'picture', [{column: 'user_id', operator: '=', value: user_id}]);
        const gallery: UserImageGallery[] = [];
        result.rows.forEach((e: { picture_path: string; slot_number: number}) => {
            gallery.push({picture_path: e.picture_path, slot_number: e.slot_number});
        });
        gallery.sort((a, b) => a.slot_number - b.slot_number);
        console.log(gallery)
        return gallery
    } catch (error) {
        throw error;
    }
}

async function userMatches(user_id: string): Promise<userMatches[] | null> {
    try {
        const result = await query.select(
            [ 'u.id AS id', 'u.user_name AS username', 'u.avatar AS avatar', 'm.match_date date'],
            'matches m',
            [{ column: 'm.user_id', operator: '=', value: user_id}],
            [{ type: 'INNER', table: 'users u', on: 'm.match_id = u.id' }]);

        if(result.rowCount && result.rowCount > 0) {
            const matches: userMatches [] = result.rows;
            return matches;
        }
        return null;
    } catch(error: any) {
        throw error;
    }
}

async function userProfileVisite(user_id: string): Promise<UserProfileVisite[] | null> {
    try {
        const result = await query.select(
            [   'u.id AS user_id', 
                'u.user_name AS user_name', 
                'u.avatar AS avatar', 
                'pv.last_visited'],
                'matches m',
            [   { column: 'm.user_id', operator: '=', value: user_id},
                { column: 'pv.visiter_id', operator: '=', value: user_id }
            ],
            [{ type: 'INNER', table: 'users u', on: 'm.match_id = u.id' },
             { type: 'LEFT', table: 'picture p', on: 'u.id = p.user_id' },
             { type: 'LEFT', table: 'profile_visite pv', on: 'u.id = pv.user_id'}
            ]);

        if(result.rowCount && result.rowCount > 0) {
            const profile_visite: UserProfileVisite [] = [];
            result.rows.forEach((e: any) => {
                profile_visite.push(e);
            });
            return profile_visite;
        }
        return null;
    } catch(error: any) {
        throw error;
    }
}

async function IsMatched(visiter_id: string, visited_id:string): Promise<boolean> {
    try {
        const result = await query.select(null, 'matches', 
            [
                {column: 'user_id', operator: '=', value:visiter_id},
                {column: 'match_id', operator: '=', value: visited_id}
            ],
        );
        if(result.rowCount) {
            return true;
        }
        return false;
    } catch (error: any) {
        throw error;
    }
}

export default {    getUserInfo,
                    getUserEmail, 
                    updateUserInfo, 
                    updateHobbies, 
                    updateUserEmail, 
                    getProfileInfo, 
                    getUserProfileImages, 
                    userMatches,
                    userProfileVisite,
                    IsMatched};
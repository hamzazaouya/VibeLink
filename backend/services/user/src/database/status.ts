/*****************************************************

 * @fileoverview Description of the file
 * @author 
 * @version 1.0.0
 * @created 2024-12-04

 *******************************************************/

import pool from '../utils/postgreSQL_conf';

async function user_location(user_id: string, latitude: number, longitude: number) {
    try {
        await pool.query(
            `
                UPDATE users
                SET location = ST_SetSRID(ST_MakePoint($1, $2), 4326)
                WHERE id = $3
            `, [longitude, latitude, user_id])
    } catch (error: any) {
        throw error
    } 
}

export default {user_location}
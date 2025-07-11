/*****************************************************

 * @fileoverview Description of the file
 * @author 
 * @version 1.0.0
 * @created 2024-11-30

 *******************************************************/

import cassandraClient from '../utils/cassandraClient';
const { v4: uuidv4 } = require('uuid')

async function regesterUserReaction(reacting_user_id: string, suggested_user_id: string, reaction: Boolean) {
    try {
        const query = `
            INSERT INTO users (id, reacting_user_id, suggested_user_id, reaction, created_at)
            VALUES (?, ?, ?, ?, ?) `;
        const id = uuidv4();
        const createdAt = new Date();
        const params = [id, reacting_user_id, suggested_user_id, reaction, createdAt];
        await cassandraClient.execute(query, params);
    } catch (error: any) {
        throw error
    }
}

async function checkForMatch(reacting_user_id: string, suggested_user_id: string): Promise<Boolean> {
    try {
        const query = ` SELECT reaction FROM users WHERE reacting_user_id = ? AND suggested_user_id = ? ALLOW FILTERING;`;
        const params = [suggested_user_id, reacting_user_id];
        const res = await cassandraClient.execute(query, params);
        if(res.rowLength > 0) {
            if (res.rows[0].reaction == true)
                return true;
        }
        return false;
    } catch (error: any) {
        throw error;
    }
}

export default {regesterUserReaction, checkForMatch};
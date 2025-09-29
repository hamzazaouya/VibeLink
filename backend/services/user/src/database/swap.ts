/*****************************************************

 * @fileoverview Description of the file
 * @author 
 * @version 1.0.0
 * @created 2024-12-02

 *******************************************************/

import pool from '../utils/postgreSQL_conf';
import CONST from '../utils/constants';
import { suggestionsData } from '../types/user.interface';
// select semilar users using (location, age, fameRating, commonTags )

async function getNearUsersId(user_id: string) {
    try {
        const result = await pool.query(`
        SELECT 
            users.id 
        FROM 
            users
        LEFT JOIN 
            matches ON matches.match_id = users.id AND matches.user_id = $1
        WHERE 
            ST_DWithin(users.location, (SELECT location FROM users WHERE id = $1), $2)
            AND gender = (
                CASE 
                    WHEN (SELECT gender FROM users WHERE id = $1) = 'male' THEN 'female'::gender_enum
                    WHEN (SELECT gender FROM users WHERE id = $1) = 'female' THEN 'male'::gender_enum
                END
            )
        AND users.id != $1
        AND matches.id IS NULL; `, [user_id, CONST.DISTANCE]);
        return result.rows;
    } catch (error) {
        throw error;
    }
}

async function getUserDistance(user_id: string, suggestion_id: string): Promise<number> {
    try {
        const result = await pool.query(`
            SELECT 
            ST_Distance(
                (SELECT location FROM users WHERE id = $1),
                (SELECT location FROM users WHERE id = $2)
            ) AS distance;
        `, [user_id, suggestion_id]);
        return result.rows[0].distance;
    } catch (error) {
        throw error;
    }
}

async function getUserAge(user_id: string): Promise<number> {
    try {
        const result = await pool.query(`
            SELECT age
            FROM users
            WHERE id = $1;`, [user_id]);
        return result.rows[0].age;
    } catch (error) {
        throw error;
    }
}

async function getUserRating(user_id: string): Promise<number> {
    try {
        const result = await pool.query(`
            SELECT rating
            FROM users
            WHERE id = $1;`, [user_id]);
        return result.rows[0].rating;
    } catch (error) {
        throw error;
    }
}

async function getSimilarInterests(user_id: string, suggestion_id: string): Promise<number> {
    try {
        const result = await pool.query(`
            SELECT COUNT(*) AS similar_interests
            FROM user_interest ui1
            JOIN user_interest ui2 ON ui1.interest_id = ui2.interest_id
            WHERE ui1.user_id = $1
            AND ui2.user_id = $2; `, [user_id, suggestion_id]);
        return result.rows[0].similar_interests;

    } catch (error) {
        throw error;
    }
}

async function get_suggetionData(mainUser: string, suggestedUser: string): Promise<suggestionsData> {
    try {
        const result = await pool.query(`
            SELECT 
                users.user_name, 
                users.gender, 
                users.age, 
                users.rating, 
                users.bio, 
                users.is_online,
                users.avatar,
                ST_Distance(users.location, (SELECT location FROM users WHERE users.id = $1)) AS distance
            FROM 
                users
            WHERE 
                users.id = $2
            GROUP BY 
                users.id, users.user_name, users.gender, users.age, users.rating, users.bio, users.is_online, users.location
        `, [mainUser, suggestedUser]);
        
        return result.rows[0];
    } catch (error: any) {
        throw error
    }
}

async function usersIdByResearch(user_id: string, age_gap: number, min_rating: number, longitude: string, latitude: string, tags: string[]) {
    try {
        const result = await pool.query(`
        SELECT DISTINCT
            users.id 
        FROM 
            users
        LEFT JOIN 
            matches ON matches.match_id = users.id AND matches.user_id = $1
        JOIN 
            user_interest ON user_interest.user_id = users.id
        JOIN 
            interests ON interests.id = user_interest.interest_id
        WHERE 
            ST_DWithin(
                users.location::geometry, 
                ST_SetSRID(ST_MakePoint($3, $4), 4326)::geometry,
                $2
            )
        AND gender = (
            CASE 
                WHEN (SELECT gender FROM users WHERE id = $1) = 'male' THEN 'female'::gender_enum
                WHEN (SELECT gender FROM users WHERE id = $1) = 'female' THEN 'male'::gender_enum
            END
        )
        AND users.id != $1
        AND matches.id IS NULL
        AND age BETWEEN (SELECT age FROM users WHERE id = $1) - $5 AND (SELECT age FROM users WHERE id = $1) + $5
        AND rating >= $6
        AND interests.interest = ANY($7);
        `, [user_id, CONST.DISTANCE, longitude, latitude, age_gap, min_rating, tags]);
    return result.rows;
    } catch (error) {
        throw error
    }
}

export default {getNearUsersId, getUserAge, getUserRating, getUserDistance, getSimilarInterests, get_suggetionData, usersIdByResearch}
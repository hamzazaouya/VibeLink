/*****************************************************

 * @fileoverview Description of the file
 * @author 
 * @version 1.0.0
 * @created 2024-11-28

 *******************************************************/

import { UserScore, suggestionsData } from "../types/user.interface";
import swapDAO from "../database/swap"
import CONST from '../utils/constants';


/*******************************************************************

 * @function  function name
 * @discription Function description
 * @created 2024-12-03
 * @version 1.0.0
 * @auther Function description

 *******************************************************************/

async function browsingSuggestionsId(user_id: string) {
    const usersId:string[] = [];
    const usersScore: UserScore[] = [];
    const usersInfo = await swapDAO.getNearUsersId(user_id);
    for (const user of usersInfo) {
        const targetAge = await swapDAO.getUserAge(user_id);
        const userScore: UserScore = {
            id: user.id,
            distance: 100 - toPercent(await swapDAO.getUserDistance(user_id, user.id), CONST.DISTANCE),
            age: calculateAgeRank(targetAge, await swapDAO.getUserAge(user.id)),
            rating: toPercent(await swapDAO.getUserRating(user.id), 5),
            hobbies: toPercent(await swapDAO.getSimilarInterests(user_id, user.id), 7),
            score: 0
        };
        userScore.score = (userScore.distance + userScore.age + userScore.rating + userScore.hobbies) / 4;
        usersScore.push(userScore);
    }
    
    usersScore.sort((a, b) => b.score - a.score);

    usersScore.forEach((e) => {
        usersId.push(e.id);
    });
    return usersId;
}


/*******************************************************************

 * @function  function name
 * @discription Function description
 * @created 2024-12-05
 * @version 1.0.0
 * @auther Function description

 *******************************************************************/

async function suggestionsData(mainUserId:string,  suggestedUsersId: string[]) {
    const suggestionsData: suggestionsData[] = []
    for (const suggestedUserId of suggestedUsersId) {
        const userData: suggestionsData = await swapDAO.get_suggetionData(mainUserId, suggestedUserId);
        suggestionsData.push(userData);
    }
    return suggestionsData;
}


/*******************************************************************

 * @function  function name
 * @discription Function description
 * @created 2024-12-05
 * @version 1.0.0
 * @auther Function description

 *******************************************************************/

async function researchSuggestionsId(user_id:string, age_gap: number, min_rating: number, longitude: string, latitude: string, tags: string[]) {
    const usersId:string[] = [];
    const usersScore: UserScore[] = [];
    console.log("------------------> before");
    const usersInfo = await swapDAO.usersIdByResearch(user_id, age_gap, min_rating, longitude, latitude, tags);
    console.log("user_info -------> ", usersInfo);
    for (const user of usersInfo) {
        const targetAge = await swapDAO.getUserAge(user_id);
        const userScore: UserScore = {
            id: user.id,
            distance: 100 - toPercent(await swapDAO.getUserDistance(user_id, user.id), CONST.DISTANCE),
            age: calculateAgeRank(targetAge, await swapDAO.getUserAge(user.id)),
            rating: toPercent(await swapDAO.getUserRating(user.id), 5),
            hobbies: toPercent(await swapDAO.getSimilarInterests(user_id, user.id), 7),
            score: 0
        };
        userScore.score = (userScore.distance + userScore.age + userScore.rating + userScore.hobbies) / 4;
        usersScore.push(userScore);
    }
    
    usersScore.sort((a, b) => b.score - a.score);

    usersScore.forEach((e) => {
        usersId.push(e.id);
    });
    return usersId;
}


/*******************************************************************

 * @function  function name
 * @discription Function description
 * @created 2024-12-03
 * @version 1.0.0
 * @auther Function description

 *******************************************************************/

function calculateAgeRank(targetAge: number, userAge: number) {
    const ageGap = Math.abs(userAge - targetAge);
    const maxAgeDifference = 10;
    const rank = 100 - (ageGap / maxAgeDifference) * 100;
    return Math.round(Math.max(0, Math.min(100, rank)));
}

function toPercent(one: number, two: number) {
    if (two != 0)
        return Math.round(one / two * 100);
    return 0;
}

export default {browsingSuggestionsId,  suggestionsData, researchSuggestionsId}
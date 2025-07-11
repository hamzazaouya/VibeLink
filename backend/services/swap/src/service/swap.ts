/*****************************************************

 * @fileoverview Description of the file
 * @author 
 * @version 1.0.0
 * @created 2024-11-30

 *******************************************************/

import swap from '../database/swap'

async function handleUserReaction(reacting_user_id: string, suggested_user_id: string, reaction: Boolean): Promise <Boolean> {
    await swap.regesterUserReaction(reacting_user_id, suggested_user_id, reaction);
    return await swap.checkForMatch(reacting_user_id, suggested_user_id);
}

export default {handleUserReaction};
/*****************************************************

 * @fileoverview Description of the file
 * @author 
 * @version 1.0.0
 * @created 2024-11-28

 *******************************************************/

import { Request, Response } from 'express';
import CONST from '../utils/constants';
import swapServices from '../service/swap'


/*******************************************************************

 * @function  function name
 * @discription Function description
 * @created 2024-12-04
 * @version 1.0.0
 * @auther Function description

 *******************************************************************/



async function browsing(req: Request, res: Response): Promise<void> {
    try {
            const user_id = req.session?.user.id;
            const suggestionsId = await swapServices.browsingSuggestionsId(user_id);
            const suggestionsData = await swapServices.suggestionsData(user_id, suggestionsId);
            res.status(CONST.SUCCESS).json({message: "successs", suggestions_data: suggestionsData});
    } catch (error) {
        res.status(CONST.SERVER_ERROR).json({message: "service error"});
    }
    
}

async function research(req: Request, res:Response) {
    const {age_gap, min_rating, longitude, latitude, tags} = req.body
    try {
        console.log(req.session, age_gap, min_rating, longitude, latitude, tags);
        const user_id = req.session?.user.id;
        const suggestionsId = await swapServices.researchSuggestionsId(user_id, age_gap, min_rating, longitude, latitude, tags);
        const suggestionsData = await swapServices.suggestionsData(user_id, suggestionsId);
        res.status(CONST.SUCCESS).json({message: "successs", suggestions_data: suggestionsData});
    } catch (error: any) {
        console.log(error.message);
        res.status(CONST.SERVER_ERROR).json({message: "service error"});
    }
}

export default {browsing, research};
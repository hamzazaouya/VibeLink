/*****************************************************

 * @fileoverview Description of the file
 * @author 
 * @version 1.0.0
 * @created 2024-11-30

 *******************************************************/

import axios from 'axios';
import CONST from '../utils/constants'

import express, {Request, Response} from 'express';
import swap from '../service/swap'

/*****************************************************

 * @fileoverview Description of the file
 * @author 
 * @version 1.0.0
 * @created 2024-12-04

 *******************************************************/



async function handleUserReaction(req: Request, res: Response) {
    const {reacting_user_id, suggested_user_id, reaction} = req.body;
    try {
        const result = await swap.handleUserReaction(reacting_user_id, suggested_user_id, reaction == 'true');
        res.status(CONST.SUCCESS).json({message: "reaction inseted successfully", match: result});
    } catch (error) {
        res.status(CONST.SERVER_ERROR).json({message: 'server error'});
    }
}

/*****************************************************

 * @fileoverview Description of the file
 * @author 
 * @version 1.0.0
 * @created 2024-12-04

 *******************************************************/



async function browsing(req: Request, res: Response) {
    try {
        console.log("Hello From Swap Service", req.session);
        console.log(req.session)
        const start = performance.now();
        const response = await axios.get(`http://nginx:80/user/browsing`, {
            withCredentials: true, // Ensures cookies are sent
            headers: {
                Cookie: req.headers.cookie, // Forward the cookies from the client request
            },
        });
        const end = performance.now();
        console.log(`Request took ${end - start} milliseconds`);
        res.status(CONST.SUCCESS).send(response.data);
    } catch (error: any) {
        console.log(error.message)
        res.status(CONST.SERVER_ERROR).json({message: 'server error'});
    }
}

/*****************************************************

 * @fileoverview Description of the file
 * @author 
 * @version 1.0.0
 * @created 2024-12-05

 *******************************************************/

async function research(req: Request, res:Response) {
    try {
        const {age_gap, min_rating, longitude, latitude, tags} = req.body
        console.log("====> ", age_gap, min_rating, longitude, latitude, tags);
        console.log("Hello From Swap Service", req.session);
        console.log(req.session)
        const start = performance.now();
        const response = await axios.post(`http://nginx:80/user/research`,  req.body, {
            withCredentials: true,
            headers: {
                Cookie: req.headers.cookie,
            },
        });
        const end = performance.now();
        console.log(`Request took ${end - start} milliseconds`);
        res.status(CONST.SUCCESS).send(response.data);
    } catch (error: any) {
        console.log(error.message)
        res.status(CONST.SERVER_ERROR).json({message: 'server error'});
    }
}

export default {handleUserReaction, browsing, research};
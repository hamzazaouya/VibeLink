/*****************************************************

 * @fileoverview Description of the file
 * @author 
 * @version 1.0.0
 * @created 2024-12-04

 *******************************************************/

import { Request, Response } from 'express';
import CONST from '../utils/constants';
import statusService from '../service/status'

async function user_location(req: Request, res: Response) {
    const {latitude, longitude} = req.body
    try {
        statusService.user_location(req.session?.user.id, latitude, longitude);
        res.status(CONST.SUCCESS).json({message: 'location updated successfully'});
    } catch (error: any) {
        console.log("error : ", error.message);
        res.status(CONST.SERVER_ERROR).json({ message: 'server error' });
    } 
}

export default {user_location}
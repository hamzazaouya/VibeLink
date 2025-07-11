/*****************************************************

 * @fileoverview Description of the file
 * @author 
 * @version 1.0.0
 * @created 2024-11-17

 *******************************************************/

import { Request, Response } from 'express';
import CONST from '../utils/constants';
import profileService from '../service/profile'
import { profileInfo } from '../types/user.interface';
import { body, param } from 'express-validator';

async function getUserInfo(req: Request, res: Response): Promise<void> {
    try {
        if(req.session) {
            const user_info = await profileService.getUserInfo(req.session.user.id);
            res.status(CONST.SUCCESS).json(user_info);
        }
    } catch (error: any) {
        if(error.message === "user not found")
            res.status(CONST.UNAUTHORIZED).json({message: error.message});
        else
            res.status(CONST.SERVER_ERROR).json({message: "server error"});
    }
}

async function updateUserInfo(req: Request, res: Response): Promise<void> {
    const { firstName, email, lastName, userName, age, phone, bio, hobbies } = req.body;
    try {
        if(req.session) {
            await profileService.updateUserInfo(req.session.user.id, firstName, lastName, userName, age, email, phone, bio, hobbies);
        }
    } catch (error) {

    }
}



/*******************************************************************

 * @function  function name
 * @discription Function description
 * @created 2024-11-20
 * @version 1.0.0
 * @auther Function description

 *******************************************************************/

//
async function getProfileInfo(req: Request, res: Response) {
    try {
        const user_info : profileInfo = await profileService.getProfileInfo(req.session?.user.id);
        res.status(CONST.SUCCESS).json(user_info);
    } catch (error: any) {
        res.status(CONST.SERVER_ERROR).json({message: "server error"});
    }
}

async function getProfileById(req: Request, res:Response) {
    const {user_id} = req.params;
    try {
        let user_info: profileInfo;
        if(req.session?.user.id == user_id) {
            user_info = await profileService.getProfileInfo(user_id);
        } else {
            user_info = await profileService.getProfileById(user_id);
        }
        res.status(CONST.SUCCESS).json(user_info);
    } catch (error: any) {
        res.status(CONST.SERVER_ERROR).json({message: "server error"}); 
    }
}

export default {getUserInfo, updateUserInfo, getProfileInfo, getProfileById};
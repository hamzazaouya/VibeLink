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
    const { first_name, email, lastName, user_name, age, phone, bio, hobbies } = req.body;
    try {
        if(req.session) {
            await profileService.updateUserInfo(req.session.user.id, first_name, lastName, user_name, age, email, phone, bio, hobbies);
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
async function getUserProfile(req: Request, res: Response) {
    if(req.session && req.session.user) {
        try {
            const user_id = req.session.user.id;
            const user_info : profileInfo = await profileService.getUserProfile(user_id);
            res.status(CONST.SUCCESS).json(user_info);
            return;
        } catch (error: any) {
            res.status(CONST.SERVER_ERROR).json({message: "server error"});
            return;
        }
    }
    res.status(CONST.UNAUTHORIZED).send("Unauthorized to access this page");
    return;
}

async function getProfileById(req: Request, res:Response) {
    if(req.session && req.session.user) {
        const {user_visited_id} = req.params;
        const {user_visiter_id} = req.session.user.id;
        try {
            let user_info: profileInfo = await profileService.getProfileById(user_visiter_id, user_visited_id);
            res.status(CONST.SUCCESS).json(user_info);
        } catch (error: any) {
            if (error.message == "not authorised") {
                res.status(CONST.UNAUTHORIZED).send({message: "not authorised"});
            }
            res.status(CONST.SERVER_ERROR).json({message: "server error"}); 
        }
    }
    res.status(CONST.UNAUTHORIZED).send("Unauthorized to access this page");
    return;
}
export default {getUserInfo, updateUserInfo, getUserProfile, getProfileById};
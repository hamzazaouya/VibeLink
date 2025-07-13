/*****************************************************

 * @fileoverview Description of the file
 * @author 
 * @version 1.0.0
 * @created 2024-11-15

 *******************************************************/

import { Request, Response } from 'express';
import CONST from '../utils/constants';
import redisClient from '../utils/redisClient';
import passwordSevice from '../service/password'
import { IUser, password } from '../types/user.interface';


/*******************************************************************

 * @function  function name
 * @discription Function description
 * @created 2024-11-15
 * @version 1.0.0
 * @auther Function description

 *******************************************************************/



async function changeUserPassword(req: Request, res: Response): Promise<void>{
    const {newPassword, oldPassword} = req.body;
    try {
        if(req.session) {
            const user: IUser = req.session.user;
            if(user) {
                await passwordSevice.changeUserPassword(user.id, oldPassword, newPassword);
                res.status(CONST.SUCCESS).json({message: "password changed successfully"});
                return;
            }
        }
        throw new Error ("server error");
    } catch (error:any) {
        if(error.message === "passwords not matched")
            res.status(CONST.UNAUTHORIZED).json({message: "passwords not matched"});
        else
            res.status(CONST.SERVER_ERROR).json({message: "server error"});
    }
}


/*******************************************************************

 * @function  function name
 * @discription Function description
 * @created 2024-11-16
 * @version 1.0.0
 * @auther Function description

 *******************************************************************/



async function verificationCredentials(req: Request, res: Response): Promise<void> {

    const {email} = req.body;
    try {
        const password = await passwordSevice.generateVerificationCredentials(email);
        await redisClient.hSet(`forgot-password:${password.verif_code}`, {
            user_id: password.user_id
        });
        await redisClient.expire(`forgot-password:${password.verif_code}`, 600); // 10 min
        
        await redisClient.hSet(`forgot-password:${password.verif_id}`, {
            user_id: password.user_id
        });
        await redisClient.expire(`forgot-password:${password.verif_id}`, 600); // 10 min
        
        res.status(CONST.SUCCESS).json({message: "user verified"});
    } catch (error: any) {
        if(error.message === 'user not exist')
            res.status(CONST.UNAUTHORIZED).json ({message: error.message });
        else 
            res.status(CONST.SERVER_ERROR).json({message: "sever error"});
    }
}


/*******************************************************************

 * @function  function name
 * @discription Function description
 * @created 2024-11-17
 * @version 1.0.0
 * @auther Function description

 *******************************************************************/



async function verifyByLink(req: Request, res: Response) {
    const { id } = req.params;

    try {
        const user_id = await redisClient.hGet(`forgot-password:${id}`, 'user_id');
        if(user_id) {
            if(req.session)
                req.session.password = user_id;
            console.log(req.session);
            res.status(CONST.SUCCESS).send("user email verified");
        }
        else
            res.status(CONST.UNAUTHORIZED).send("user email not verified");
    } catch {
        res.status(CONST.SERVER_ERROR).send("server error");
    }
    
}


/*******************************************************************

 * @function  function name
 * @discription Function description
 * @created 2024-11-17
 * @version 1.0.0
 * @auther Function description

 *******************************************************************/



async function verifyByCode(req: Request, res: Response) {
    const {code} = req.body;

    try {
        const user_id = await redisClient.hGet(`forgot-password:${code}`, 'user_id');
        if(user_id) {
            if(req.session)
                req.session.password = user_id;
            console.log("------------> ", req.session);
            res.status(CONST.SUCCESS).send("user email verified");
        }
        else
            res.status(CONST.UNAUTHORIZED).send("user email not verified");
    } catch {
        res.status(CONST.SERVER_ERROR).send("server error");
    }
}

async function changePassword(req: Request, res: Response) {
    const {newPassword} = req.body;
    console.log("----------> ", newPassword);
    console.log(req.session);
    try {
        if(req.session) {
            const user_id: string  = req.session.password;
            if(user_id) {
                await passwordSevice.changePassword(user_id, newPassword);
                res.status(CONST.SUCCESS).json({message: "password changed successfully"});
                return;
            }
        }
        throw new Error ("server error");
    } catch (error:any) {
        res.status(CONST.SERVER_ERROR).json({message: "server error"});
    }
}

//https://signin.intra.42.fr/users/password/edit?reset_password_token=zvpAHz7UcQs8jxd9m4bx
//https://signin.intra.42.fr/users/password/edit?reset_password_token=qiLQK4xDcSxB8dxErC9v
export default {changeUserPassword, verificationCredentials, verifyByLink, verifyByCode, changePassword};
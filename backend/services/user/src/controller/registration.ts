/*****************************************************

 * @fileoverview Description of the file
 * @author 
 * @version 1.0.0
 * @created 2024-11-13

 *******************************************************/

import { Request, Response } from 'express';
import registerService from '../service/registration'
import CONST from '../utils/constants';

interface MulterFiles {
    profileImage?: Express.Multer.File[];  // Profile image: optional, 1 file
    images?: Express.Multer.File[];          // Regular images: optional, up to 5 files
}

/*******************************************************************

 * @function  function name
 * @discription Function description
 * @created 2024-11-13
 * @version 1.0.0
 * @auther Function description

 *******************************************************************/


async function registerUser(req: Request, res: Response): Promise<void> {
    const { firstName, lastName, age, gender, phone, bio, latitude, longitude } = req.body;
    const hobbies = JSON.parse(req.body.hobbies);
    const { profileImage, images } = req.files as MulterFiles;
    try {
        if(req.session) {
            const user = req.session.user;
            await registerService.registerUser(user.id, firstName, lastName, age, gender, phone, bio, latitude, longitude, hobbies, profileImage, images);
        } else {
            throw new Error ("server error ")
        }
        req.session.user.is_registred = true;
        res.status(CONST.SUCCESS).json({ message: 'user registred successfully.' });
    } catch (error) {
        res.status(CONST.SERVER_ERROR).json({ message: 'server error' });
    }
}

export default {registerUser};

/*****************************************************

 * @fileoverview Description of the file
 * @author 
 * @version 1.0.0
 * @created 2024-11-13

 *******************************************************/

import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import CONST from "../utils/constants";


/*******************************************************************

 * @function  function name
 * @discription Function description
 * @created 2024-11-13
 * @version 1.0.0
 * @auther Function description

 *******************************************************************/



function verifyRegistration(req: Request, res: Response, next: NextFunction): void {

    const { firstName, lastName, age, gender, phone, bio, latitude, longitude } = req.body;

    if (!firstName || !lastName || !age || !gender || !phone || !bio || !latitude || !longitude) {
        res.status(CONST.BAD_REQUEST).json({
            error: "All fields are required: firstName, lastName, age, gender, phone, bio, latitude, longitude and hobbies."
        });
    } else {
        const hobbies = JSON.parse(req.body.hobbies);
        console.log(hobbies);
        if (!Array.isArray(hobbies) || hobbies.length !== 7) {
            return void res.status(CONST.BAD_REQUEST).json({
                error: "Hobbies must be an array containing exactly 7 items."
            });
        }
        
        const validHobbies = ['quran', 'workout', 'soccer', 'basketball', 'swimming', 'chess', 'investing', 'photography', 'coffee', 'coding', 'motorcycling', 'camping', 'blogging', 'bitcoin', 'anime', 'gaming', 'drawing', 'dj', 'music', 'netflex', 'cooking', 'podcasting', 'fishing']
        for (const hobby of hobbies) {
            if (!validHobbies.includes(hobby.toLowerCase())) {
                console.log("notvalid hobbies", hobby);
                return void res.status(CONST.BAD_REQUEST).json({
                    error: `Hobby "${hobby}" is not a valid hobby.`
                });
            }
        }
        next();
    }
}

const validateRegistration = [
    // Validate firstName: between 5 and 20 characters
    body('firstName')
        .isLength({ min: 3, max: 20 })
        .withMessage('First name must be between 3 and 20 characters'),

    // Validate lastName: between 5 and 20 characters
    body('lastName')
        .isLength({ min: 3, max: 20 })
        .withMessage('Last name must be between 3 and 20 characters'),


    // Validate age: number between 0 and 100
    body('age')
        .isInt({ min: 0, max: 100 })
        .withMessage('Age must be a number between 0 and 100'),

    // Validate gender: must be 'male' or 'female'
    body('gender')
        .isIn(['male', 'female'])
        .withMessage('Gender must be either "male" or "female"'),

    // Validate phone: numeric string between 10 and 15 characters
    body('phone')
        .isString()
        .withMessage('Phone number must be a string')
        .matches(/^\d+$/)
        .withMessage('Phone number must only contain numeric characters')
        .isLength({ min: 10, max: 15 })
        .withMessage('Phone number must be between 10 and 15 digits'),

    // Validate bio: text with a maximum length of 1000 characters
    body('bio')
        .isLength({ max: 1000 })
        .withMessage('bio must not exceed 1000 characters'),
];


/*******************************************************************

 * @function  function name
 * @discription Function description
 * @created 2024-11-13
 * @version 1.0.0
 * @auther Function description

 *******************************************************************/



const handleRegestrationErrors = (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(CONST.BAD_REQUEST).json({
            errors: errors.array().map((err) => ({
                field: err.type,
                message: err.msg,
            })),
        });
    } else
        next();
};

export default {verifyRegistration, validateRegistration, handleRegestrationErrors}
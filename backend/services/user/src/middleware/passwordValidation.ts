/*****************************************************

 * @fileoverview Description of the file
 * @author 
 * @version 1.0.0
 * @created 2024-11-15

 *******************************************************/

import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import logger from "../utils/logger";
import CONST from "../utils/constants";

function verify(req: Request, res: Response, next: NextFunction): void {
    const {oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
        logger.user.info(`${req.ip}: ${'old password and new password are required'}`);
        res.status(CONST.BAD_REQUEST).json({ error: 'old password and new password are required' });
    } 
    else
        next();
}

const validate = [

    body('newPassword')
        .notEmpty().withMessage('New password is required') // Check if password is not empty
        .isLength({ min: 10, max: 15 }).withMessage('Password must be between 10 and 15 characters long') // Length restrictions for password
        .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter') // At least one uppercase letter
        .matches(/[0-9]/).withMessage('Password must contain at least one number') // At least one number
        .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Password must contain at least one special character'), // At least one special character
];


/*******************************************************************

 * @function  function name
 * @discription Function description
 * @created 2024-11-15
 * @version 1.0.0
 * @auther Function description

 *******************************************************************/

const handleErrors = (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(CONST.BAD_REQUEST).json({
            errors: errors.array().map((err) => ({
                message: err.msg,
            })),
        });
    }
    next();
};


function verifyNewPassword(req: Request, res: Response, next: NextFunction): void {
    const {newPassword} = req.body;

    if (!newPassword) {
        logger.user.info(`${req.ip}: ${'new password are required'}`);
        res.status(CONST.BAD_REQUEST).json({ error: 'new password are required' });
    } 
    else
        next();
}

export default {verify, verifyNewPassword, validate, handleErrors};
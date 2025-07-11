/*****************************************************

 * @fileoverview This module provides middleware functions to validate user input 
 * @author hazaouya
 * @version 1.0.0
 * @created 2024-10-28

 *******************************************************/

import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import logger from "../utils/logger";
import CONST from "../utils/constants";


/*******************************************************************

 * @function  function verifyRegistration
 * @discription checking email && password
 * @created 2024-10-28
 * @version 1.0.0
 * @auther Function description

 *******************************************************************/



function verifyAuth(req: Request, res: Response, next: NextFunction): void {
    const { email, password } = req.body;
    if (!email || !password) {
        logger.user.info(`${req.ip}: ${'Email and Password are required'}`);
        res.status(CONST.BAD_REQUEST).json({ error: 'Email and Password are required' });
    } else 
        next();
}

// Validation rules
const validateRegistration = [
    body('email')
        .notEmpty().withMessage('Email is required') // Check if email is not empty
        .isEmail().withMessage('Invalid email format') // Check if email is valid
        .isLength({ max: 50 }).withMessage('Email must not exceed 25 characters'), // Max length for email

    body('password')
        .notEmpty().withMessage('Password is required') // Check if password is not empty
        .isLength({ min: 10, max: 15 }).withMessage('Password must be between 10 and 15 characters long') // Length restrictions for password
        .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter') // At least one uppercase letter
        .matches(/[0-9]/).withMessage('Password must contain at least one number') // At least one number
        .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Password must contain at least one special character'), // At least one special character
];
  

/*******************************************************************

 * @function  function handleAuthErrors
 * @discription validate email && passowrd
 * @created 2024-10-28
 * @version 1.0.0
 * @auther hazaouya

 *******************************************************************/


const handleAuthErrors = (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(CONST.BAD_REQUEST).json({
            errors: errors.array().map((err) => ({
                message: err.msg,
            })),
        });
    } else
        next();
};

export default { verifyAuth, handleAuthErrors, validateRegistration };
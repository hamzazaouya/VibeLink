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
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        logger.user.info(`${req.ip}: ${'Email and Password are required'}`);
        res.status(CONST.BAD_REQUEST).json({ error: 'Email and Password are required' });
    } else 
        next();
}

// Validation rules
const validateRegistration = [
    body('username')
        .trim()
        .notEmpty().withMessage('Username is required')
        .isLength({ min: 4, max: 10 }).withMessage('Username must be between 3 and 30 characters')
        .matches(/^[A-Za-z_]+$/).withMessage('Username must contain only letters and underscores'),

    body('email')
        .trim()
        .normalizeEmail()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format')
        .isLength({ max: 50 }).withMessage('Email must not exceed 50 characters'),

    body('password')
        .notEmpty().withMessage('Password is required') // Check if password is not empty
        .isLength({ min: 10, max: 20 }).withMessage('Password must be between 10 and 20 characters long') // Length restrictions for password
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
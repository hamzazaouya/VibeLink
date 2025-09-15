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
    const {email, password } = req.body;
    if (!email || !password) {
        logger.user.info(`${req.ip}: ${'Email and Password are required'}`);
        res.status(CONST.BAD_REQUEST).json({ error: 'Email and Password are required' });
    } else 
        next();
}

// Validation rules
const validateRegistration = [
    body('email')
        .trim()
        .normalizeEmail()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format'),

    body('password')
        .notEmpty().withMessage('Password is required')
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
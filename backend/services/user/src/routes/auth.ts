/*****************************************************

 * @fileoverview Defines and exports authentication-related routes.
 * @author hazaouya
 * @version 1.0.0
 * @created 2024-10-21

 *******************************************************/

// authRoutes.ts

import express, { Request, Response } from 'express';
import authController from '../controller/auth';
import authMiddleware from '../middleware/authenticate';
import authValidation from '../middleware/authValidation';
import passport from 'passport';
import uploader from '../middleware/uploader';

const route = express.Router();

route.post('/user/logout', authController.logout)

// Route for user login using email and password
route.post('/user/login', uploader.parceFrom.none(), authValidation.verifyAuth, authValidation.validateRegistration, authValidation.handleAuthErrors, authController.login);

route.get('/user/home', (req: Request, res: Response) => {
    if(req.session && req.session.user)
        res.status(200).json({id: req.session?.user.id})
    else 
        res.status(400).json({message: "bad request"});
});

// Route for user signup by email and password.
route.post('/user/signup', authValidation.verifyAuth, authValidation.validateRegistration, authValidation.handleAuthErrors, authController.signup);

// Route for verifying user email
route.get('/user/verify/email/:id', authMiddleware.authEmailVerification, authController.verifyEmailLink);
route.post('/user/verify/email', authMiddleware.authEmailVerification, authController.verifyEmailCode);

// Discord authentication routes
route.get('/user/auth/discord', passport.authenticate('discord'));
route.get('/user/auth/discord/redirect', passport.authenticate("discord", { failureRedirect: "/login" }), authController.discordAuth);

export default route;

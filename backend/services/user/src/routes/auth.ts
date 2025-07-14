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
import query from '../utils/queryEngine';
import { connectedUsers } from '../utils/socket';
const route = express.Router();
import pool from '../utils/postgreSQL_conf';


/**
 * @swagger
 * /user/logout:
 *   post:
 *     summary: Logout The User
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: user logged out successfully
 */

route.post('/user/logout', authController.logout)

// Route for user login using email and password
route.post('/user/login', uploader.parceFrom.none(), authValidation.verifyAuth, authValidation.validateRegistration, authValidation.handleAuthErrors, authController.login);

/**
 * @swagger
 * /user/signup:
 *   post:
 *     summary: Signup by Email and Password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: 1H.123+3453
 *     responses:
 *       201:
 *         description: user created successfully
 */


// Route for user signup by email and password.
route.post('/user/signup', authValidation.verifyAuth, authValidation.validateRegistration, authValidation.handleAuthErrors, authController.signup);

// Route for verifying user email
route.get('/user/verify/email/:id', authMiddleware.authEmailVerification, authController.verifyEmailLink);
route.post('/user/verify/email', authMiddleware.authEmailVerification, authController.verifyEmailCode);

// Discord authentication routes
route.get('/user/auth/discord', passport.authenticate('discord'));
route.get('/user/auth/discord/redirect', passport.authenticate("discord", { failureRedirect: "/login" }), authController.discordAuth);

export default route;

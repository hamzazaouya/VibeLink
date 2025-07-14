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


/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Login by Email and Password
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
 *       200:
 *         description: user logged successfully
 */
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

route.post('/user/signup', authValidation.verifyAuth, authValidation.validateRegistration, authValidation.handleAuthErrors, authController.signup);

/**
 * @swagger
 * /user/verify/email/{id}:
 *   get:
 *     summary: Verify email via verification link
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique verification ID from the email link
 *     responses:
 *       200:
 *         description: Email verified successfully
 *       400:
 *         description: Invalid or expired verification link
 */

// Route for verifying user email
route.get('/user/verify/email/:id', authMiddleware.authEmailVerification, authController.verifyEmailLink);

/**
 * @swagger
 * /user/verify/email:
 *   post:
 *     summary: Verify user email using a verification code
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *             properties:
 *               code:
 *                 type: string
 *                 description: The verification code sent to the user's email
 *                 example: "123456f"
 *     responses:
 *       200:
 *         description: Email verified successfully
 *       400:
 *         description: Invalid or expired verification code
 */
route.post('/user/verify/email', authMiddleware.authEmailVerification, authController.verifyEmailCode);

// Discord authentication routes
route.get('/user/auth/discord', passport.authenticate('discord'));
route.get('/user/auth/discord/redirect', passport.authenticate("discord", { failureRedirect: "/login" }), authController.discordAuth);

export default route;

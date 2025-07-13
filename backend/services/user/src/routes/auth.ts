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

route.post('/user/logout', authController.logout)

route.get('/user/signup', async (req, res) => {
    const user_id = req.query.id
    // const query = "SELECT i.interest FROM user_interest ui JOIN interests i ON ui.interest_id = i.id WHERE ui.user_id = $1;"
    // SELECT i.interest FROM "user_interest ui" INNER JOIN "interests i" ON ui.interest_id = i.id WHERE ui.user_id = $1
    // const user_interests = await pool.query(query, [user_id]);
    // const result = await query.select(
    //     ['i.interest'],               // fields
    //     'user_interest ui',           // main table with alias
    //     [{                            // conditions
    //         column: 'ui.user_id',
    //         operator: '=',
    //         value: user_id               // <- this should be defined in your scope
    //     }],
    //     [                             // joins
    //         {
    //         type: 'INNER',
    //         table: 'interests i',
    //         on: 'ui.interest_id = i.id'
    //         }
    //     ]
    // );
    const result = await query.select(null, "users", null);
    console.log(result)
    res.send(result.rows);
});


// Route for user login using email and password
route.post('/user/login', uploader.parceFrom.none(), authValidation.verifyAuth, authValidation.validateRegistration, authValidation.handleAuthErrors, authController.login);

// Route for user signup by email and password.
route.post('/user/signup', authValidation.verifyAuth, authValidation.validateRegistration, authValidation.handleAuthErrors, authController.signup);

// Route for verifying user email
route.get('/user/verify/email/:id', authMiddleware.authEmailVerification, authController.verifyEmailLink);
route.post('/user/verify/email', authMiddleware.authEmailVerification, authController.verifyEmailCode);

// Discord authentication routes
route.get('/user/auth/discord', passport.authenticate('discord'));
route.get('/user/auth/discord/redirect', passport.authenticate("discord", { failureRedirect: "/login" }), authController.discordAuth);

export default route;

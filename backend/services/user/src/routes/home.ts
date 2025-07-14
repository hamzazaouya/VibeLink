/*****************************************************

 * @fileoverview Description of the file
 * @author 
 * @version 1.0.0
 * @created 2024-10-22

 *******************************************************/

import express, { Request, Response } from 'express';
import authMiddleware from '../middleware/authenticate';
import homeController from '../controller/home';

const route = express.Router();

/**
 * @swagger
 * /users/home:
 *   get:
 *     summary: Get User Home
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 */

route.get('/user/home', authMiddleware.authenticate, homeController.home);

export default route;

/*****************************************************

 * @fileoverview Description of the file
 * @author 
 * @version 1.0.0
 * @created 2024-11-17

 *******************************************************/

import express from 'express';

const route = express.Router();
import profileController from '../controller/profile'

/**
 * @swagger
 * /user/profile/settings/info:
 *   get:
 *     summary: Verify email via verification link
 *     tags: [Profile]
 *     responses:
 *       200:
 *         description: UserInfo {first_name, last_name, user_name, age, phone, email, bio, hobbies}
 *       401:
 *         description: Unauthorized
 */
route.get('/user/profile/settings/info', profileController.getUserInfo);

/**
 * @swagger
 * /user/profile/settings/info:
 *   post:
 *     summary: Signup by providing personal details and credentials
 *     tags: [Profile]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - first_name
 *               - lastName
 *               - user_name
 *               - age
 *               - email
 *               - phone
 *               - password
 *             properties:
 *               first_name:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *               user_name:
 *                 type: string
 *                 example: johnny99
 *               age:
 *                 type: integer
 *                 example: 28
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *               phone:
 *                 type: string
 *                 example: "+212612345678"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: 1H.123+3453
 *               bio:
 *                 type: string
 *                 example: A passionate software developer from Morocco.
 *               hobbies:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["coding", "reading", "gaming"]
 *     responses:
 *       201:
 *         description: User created successfully
 */

route.post('/user/profile/settings/info', profileController.updateUserInfo);

/**
 * @swagger
 * /user/users/me:
 *   get:
 *     summary: Get the authenticated user's profile information and images
 *     tags: [Profile]
 *     responses:
 *       200:
 *         description: User profile data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "a1b2c3d4"
 *                 first_name:
 *                   type: string
 *                   example: "John"
 *                 lastName:
 *                   type: string
 *                   example: "Doe"
 *                 user_name:
 *                   type: string
 *                   example: "johnny99"
 *                 age:
 *                   type: integer
 *                   example: 28
 *                 email:
 *                   type: string
 *                   example: "john@example.com"
 *                 phone:
 *                   type: string
 *                   example: "+212612345678"
 *                 bio:
 *                   type: string
 *                   example: "Passionate about software engineering."
 *                 hobbies:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["coding", "reading", "gaming"]
 *                 images:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       url:
 *                         type: string
 *                         format: uri
 *                         example: "https://cdn.example.com/images/user123/photo1.jpg"
 *       401:
 *         description: Unauthorized - missing or invalid token
 */

route.get('/user/users/me', profileController.getProfileInfo);

/**
 * @swagger
 * /user/users/:userId:
 *   get:
 *     summary: Get the authenticated user's profile information and images
 *     tags: [Profile]
 *     responses:
 *       200:
 *         description: User profile data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "a1b2c3d4"
 *                 first_name:
 *                   type: string
 *                   example: "John"
 *                 lastName:
 *                   type: string
 *                   example: "Doe"
 *                 user_name:
 *                   type: string
 *                   example: "johnny99"
 *                 age:
 *                   type: integer
 *                   example: 28
 *                 email:
 *                   type: string
 *                   example: "john@example.com"
 *                 phone:
 *                   type: string
 *                   example: "+212612345678"
 *                 bio:
 *                   type: string
 *                   example: "Passionate about software engineering."
 *                 hobbies:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["coding", "reading", "gaming"]
 *                 images:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       url:
 *                         type: string
 *                         format: uri
 *                         example: "https://cdn.example.com/images/user123/photo1.jpg"
 *       401:
 *         description: Unauthorized - missing or invalid token
 */

route.get('/user/users/:userId', profileController.getProfileById);

export default route;
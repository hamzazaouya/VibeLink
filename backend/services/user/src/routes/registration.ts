/*****************************************************

 * @fileoverview Description of the file
 * @author 
 * @version 1.0.0
 * @created 2024-11-13

 *******************************************************/

import express, { Request, response, Response } from 'express';
import registrationController from '../controller/registration';
import registerValidation from '../middleware/registerValidation';
import uploader from '../middleware/uploader';

const route = express.Router();

route.post('/user/register', /*authMiddleware.authUserRegestration,*/
                        uploader.uploadRegistrationImages,
                        registerValidation.verifyRegistration,
                        registerValidation.validateRegistration,
                        registerValidation.handleRegestrationErrors,
                        registrationController.registerUser);

export default route;
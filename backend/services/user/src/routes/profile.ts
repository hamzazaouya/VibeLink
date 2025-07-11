/*****************************************************

 * @fileoverview Description of the file
 * @author 
 * @version 1.0.0
 * @created 2024-11-17

 *******************************************************/

import express from 'express';

const route = express.Router();
import profileController from '../controller/profile'

route.get('/user/profile/settings/info', profileController.getUserInfo);
route.post('/user/profile/sttings/info', profileController.updateUserInfo);
route.get('/user/users/me', profileController.getProfileInfo);
route.get('/user/users/:userId', profileController.getProfileById);

export default route;
/*****************************************************

 * @fileoverview Description of the file
 * @author 
 * @version 1.0.0
 * @created 2024-12-04

 *******************************************************/

import express from 'express';
import statusController from '../controller/status'
import uploader from '../middleware/uploader';

const route = express.Router();

route.post('/user/location', uploader.parceFrom.none(), statusController.user_location);

export default route
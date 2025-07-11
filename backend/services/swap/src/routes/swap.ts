/*****************************************************

 * @fileoverview Description of the file
 * @author 
 * @version 1.0.0
 * @created 2024-11-30

 *******************************************************/

import express, { Request, response, Response } from 'express';
import swapController from '../controller/swap';
import uploader from '../middleware/uploader';


const route = express.Router();

route.post('/swap/reaction', uploader.parceFrom.none(), swapController.handleUserReaction);
route.get("/swap/browsing", uploader.parceFrom.none(), swapController.browsing );
route.post("/swap/research", uploader.parceFrom.none(), swapController.research); 
export default route
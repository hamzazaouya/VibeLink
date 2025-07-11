/*****************************************************

 * @fileoverview Description of the file
 * @author 
 * @version 1.0.0
 * @created 2024-11-15

 *******************************************************/

import express from 'express';

const route = express.Router();
import changePassword from '../middleware/passwordValidation'
import uploader from '../middleware/uploader';
import passwordController from '../controller/password'

route.patch("/user/settings/change",  /*authMiddleware.authenticate,*/ 
                                    uploader.parceFrom.none(), 
                                    changePassword.verify,
                                    changePassword.validate,
                                    changePassword.handleErrors,
                                    passwordController.changeUserPassword
                                    );

route.post("/user/password/forget",  uploader.parceFrom.none(),
                                    passwordController.verificationCredentials);

route.get('/user/verify/password/:id', passwordController.verifyByLink);
route.post('/user/verify/password', uploader.parceFrom.none(), passwordController.verifyByCode);
route.post('/user/password/change',   uploader.parceFrom.none(),
                                            changePassword.verifyNewPassword,
                                            changePassword.handleErrors,
                                            passwordController.changePassword
                                            );

export default route;
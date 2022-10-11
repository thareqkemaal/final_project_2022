const express = require('express');
const { userController } = require('../controllers');
const { readToken } = require('../config/encript');
const route = express.Router();
const { uploader }=require('../config/upload')

const upload = uploader('/img_profile','/IMGPROFILE').array('images',1)

// route.get('/getaddress', userController.getaddress);
route.get('/',userController.getData);
route.post('/register',userController.register);
route.post('/login',userController.login);
route.get('/keep-login',readToken,userController.keeplogin);
route.patch('/update-verif',readToken,userController.verification);
route.get('/resend-verif',userController.resendVerif);
route.patch('/edit-profile',upload,readToken,userController.editProfile);
route.patch('/change-password',readToken,userController.changePass);
route.post('/send-reset',userController.sendReset);
route.post('/reset-password',readToken,userController.resetPass);

module.exports=route
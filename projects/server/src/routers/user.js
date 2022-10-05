const express = require('express');
const { userController } = require('../controllers');
const { readToken } = require('../config/encript');
const route = express.Router();
const { uploader }=require('../config/upload')

const upload = uploader('/img_profile','/IMGPROFILE').array('images',1)

route.get('/',userController.getData);
route.post('/register',userController.register);
route.post('/login',userController.login);
route.get('/keeplogin',readToken,userController.keepLogin);
route.patch('/updateverif',readToken,userController.verification);
route.get('/resendverif',userController.resendVerif);
route.patch('/editprofile',upload,readToken,userController.editProfile);


module.exports=route
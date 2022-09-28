const express = require('express')
const { userController } = require('../controllers')
const { readToken } = require('../config/encript')
const route = express.Router()

route.get('/',userController.getData)
route.post('/register',userController.register)
route.post('/login',userController.login)
route.patch('/updateverif',readToken,userController.verification)

module.exports=route
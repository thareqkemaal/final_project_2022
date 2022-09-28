const express = require('express')
const { userController } = require('../controllers')
const route = express.Router()

route.get('/',userController.getData)
route.post('/',userController.register)

module.exports=route
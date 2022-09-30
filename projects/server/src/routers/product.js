const express = require('express');
const route = express.Router();
const { productController } = require('../controllers');

route.get('/getcartdata', productController.getcartdata);
route.delete('/deletecart', productController.deletecart)
route.patch('/updatecart', productController.updatecart)

module.exports = route;
const express = require('express');
const route = express.Router();
const { readToken } = require('../config/encript');
const { productController } = require('../controllers');

route.get('/getcartdata', readToken, productController.getcartdata);
route.delete('/deletecart/:idcart', productController.deletecart);
route.patch('/updatecart', readToken, productController.updatecart);

module.exports = route;
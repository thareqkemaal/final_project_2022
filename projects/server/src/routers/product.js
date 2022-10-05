const express = require('express');
const route = express.Router();
const { readToken } = require('../config/encript');
const { productController } = require('../controllers');

route.post('/getproduct', productController.getProduct);
route.post('/filterproduct/:id', productController.filterProduct);
route.get('/getcategory', productController.getCategory);

// CART
route.get('/getcartdata', readToken, productController.getcartdata);
route.delete('/deletecart/:idcart', productController.deletecart);
route.patch('/updatecart', readToken, productController.updatecart);
route.post('/addcart', readToken, productController.addCart);

module.exports = route;
const express = require('express');
const route = express.Router();
const { productController } = require('../controllers');

route.post('/getproduct', productController.getProduct);
route.post('/filterproduct/:id', productController.filterProduct);
route.get('/getcategory', productController.getCategory);
route.get('/getcartdata', productController.getcartdata);
route.delete('/deletecart', productController.deletecart)
route.patch('/updatecart', productController.updatecart)

module.exports = route;
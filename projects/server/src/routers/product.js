const express = require('express');
const route = express.Router();
const { readToken } = require('../config/encript');
const { productController } = require('../controllers');
const { uploader } = require('../config/upload');

// Upload & Edit Product Pict
const uploadProductPict = uploader('/imgProductPict', 'IMGPRODUCTPICT').array('images', 1);

route.post('/getproduct', productController.getProduct);
route.post('/filterproduct/:id', productController.filterProduct);
route.post('/getproductadmin', productController.getProductAdmin);
route.post('/add', uploadProductPict, productController.addProduct, productController.addStock);
route.patch('/edit/:id', uploadProductPict, productController.editProduct);
route.delete('/delete/:id', productController.deleteProduct);
route.get('/getcategory', productController.getCategory);
route.get('/getcartdata', productController.getcartdata);
route.delete('/deletecart', productController.deletecart)
route.patch('/updatecart', productController.updatecart)

module.exports = route;
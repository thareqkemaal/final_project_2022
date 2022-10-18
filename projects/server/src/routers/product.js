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
route.patch('/edit/:id', uploadProductPict, productController.stockHistory, productController.editProduct);
route.delete('/delete/:id', productController.deleteProduct);
route.get('/getunit', productController.getUnit);
route.post('/addunit', productController.addUnit);
route.delete('/deleteunit/:id', productController.deleteUnit);

// APKG2-20 : Add, edit, delete category
route.get('/getcategory', productController.getCategory);
route.post('/addcategory', productController.addCategory);
route.patch('/editcategory/:id', productController.editCategory);
route.delete('/deletecategory/:id', productController.deleteCategory);

// CART
route.get('/getcartdata', readToken, productController.getcartdata);
route.delete('/deletecart/:idcart', productController.deletecart);
route.patch('/updatecart', readToken, productController.updatecart);
route.post('/addcart', readToken, productController.addCart);


// Conversion Unit
route.patch('/unitconv', productController.unitConv);
module.exports = route;
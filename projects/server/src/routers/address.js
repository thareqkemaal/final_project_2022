const express = require('express');
const { addressController } = require('../controllers');
const { readToken } = require('../config/encript');
const route = express.Router();

route.get('/get', readToken, addressController.getAddress); // getAddress, pakai huruf A besar
route.post('/add', readToken, addressController.addAddress);
route.patch('/update', readToken, addressController.updateAddress);
route.delete('/delete/:idaddress', addressController.deleteAddress);

module.exports = route;


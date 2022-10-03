const express = require('express');
const { rajaOngkirController } = require('../controllers');
const route = express.Router();

// RAJAONGKIR
route.get('/province', rajaOngkirController.getProvince);
route.get('/city', rajaOngkirController.getCity);
route.get('/delivery/:origin/:destination/:weight/:courier', rajaOngkirController.getDelivery);



module.exports = route
const express = require('express');
const { transactionController } = require('../controllers');
const { readToken } = require('../config/encript');
const { uploader } = require('../config/upload');
const route = express.Router();

const prescriptionUploader = uploader('/prescription', 'prescription').array('prescription_pic', 1);

// PRESCRIPTION
route.post('/addprescription', prescriptionUploader, readToken, transactionController.addTransaction);

module.exports=route
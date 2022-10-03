const express = require('express');
const { transactionController } = require('../controllers');
const { readToken } = require('../config/encript');
const { uploader } = require('../config/upload');
const route = express.Router();

const prescriptionUploader = uploader('/prescription', 'userprescription').array('prescription_pic', 1);

// PRESCRIPTION
route.post('/addprescription', prescriptionUploader, readToken, transactionController.addPrescription);

module.exports=route
const { transport } = require('../config/nodemailer');
const { dbConf, dbQuery } = require('../config/db');
const { hashPassword, createToken } = require('../config/encript');


module.exports = {
  addPrescription: async (req, res) => {
    try {

    } catch (error) {
      console.log(error);
      res.status(500).send(error)
    }
  },
}
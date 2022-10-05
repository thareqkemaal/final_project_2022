const { transport } = require('../config/nodemailer');
const { dbConf, dbQuery } = require('../config/db');


module.exports = {
  addTransaction: async (req, res) => {
    try {
      // console.log(req.dataToken)
      // console.log(JSON.parse(req.body.datatransaction));
      // console.log(req.files[0].filename);
      // console.log(req.files);
      // console.log(req.body);

      if (req.files) {
        // status_id = 3 karena harus menunggu konfirmasi admin
        // from prescription page
        let data = JSON.parse(req.body.datatransaction);

        await dbQuery(`INSERT INTO transaction (user_id, user_name, invoice_number, status_id, user_address, order_weight, delivery_price, shipping_courier, prescription_pic)
        VALUES (${dbConf.escape(req.dataToken.iduser)}, ${dbConf.escape(req.dataToken.fullname)}, ${dbConf.escape(data.invoice)}, 3, ${dbConf.escape(data.address)}, ${dbConf.escape(data.weight)},
        ${dbConf.escape(data.delivery)}, ${dbConf.escape(data.courier)}, '/prescription/${req.files[0].filename}');`)
      } else {
        // status_id = 4 menunggu pembayaran
        // from cart-checkout page

        let data = req.body;

        await dbQuery(`INSERT INTO transaction (user_id, user_name, invoice_number, status_id, user_address, total_price, order_weight, delivery_price, shipping_courier)
        VALUES (${dbConf.escape(req.dataToken.iduser)}, ${dbConf.escape(req.dataToken.fullname)}, ${dbConf.escape(data.invoice)}, 3, ${dbConf.escape(data.address)}, ${dbConf.escape(data.total)}, ${dbConf.escape(data.weight)},
        ${dbConf.escape(data.delivery)}, ${dbConf.escape(data.courier)});`)

      }

      res.status(200).send({
        success: true,
        message: 'Add Transaction Success'
      })


    } catch (error) {
      console.log(error);
      res.status(500).send(error)
    }
  },

  updateTransaction: async (req, res) => {
    try {

      if (req.files){

      let data = JSON.parse(req.body.datatransaction);
      
      await dbQuery(`UPDATE transaction SET payment_proof_pic='/paymentproof/${req.files[0].filename}' WHERE idtransaction = ${dbConf.escape(data.transactionId)};`)
      
      }

      res.status(200).send({
        success: true,
        message: 'Transaction Updated'
      })

    } catch (error) {
      console.log(error)
      res.status(500).send(error)
    }
  }
}
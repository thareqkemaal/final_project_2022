const { transport } = require('../config/nodemailer');
const { dbConf, dbQuery } = require('../config/db');


module.exports = {
  getTransaction: async (req, res) => {
    try {
      let filter = [];
      for (const key in req.query) {
        if (key == 'end') {
          filter.push(`date_order < ${dbConf.escape(req.query[key])}`)
        } else if (key == 'start') {
          filter.push(`date_order > ${dbConf.escape(req.query[key])}`)
        } else {
          filter.push(`${key} = ${dbConf.escape(req.query[key])}`)
        }
      }
      let sqlGet = `Select *,date_format(date_order,'%e %b %Y, %H:%i') as date_order from transaction 
        ${filter.length == 0 ? '' : `where ${filter.join(' AND ')}`} order by date_order desc ;`;

      let transaction = await dbQuery(sqlGet);
      if (transaction) {
        for (i = 0; i < transaction.length; i++) {
          transaction[i].detail = await dbQuery(`SELECT * FROM transaction_detail where transaction_id=${transaction[i].idtransaction};`)
        }
        await res.status(200).send(transaction)
      }
    } catch (error) {
      console.log(error)
      res.status(500).send(error)
    }
  },
  addTransaction: async (req, res) => {
    try {
      // console.log(req.dataToken)
      // console.log(JSON.parse(req.body.datatransaction));
      // console.log(req.files[0].filename);
      // console.log(req.files);
      console.log(req.body);

      if (req.files) {
        // status_id = 3 karena harus menunggu konfirmasi admin
        // from prescription page
        let data = JSON.parse(req.body.datatransaction);

        await dbQuery(`INSERT INTO transaction (user_id, user_name,user_phone_number, invoice_number, status_id, user_address, order_weight, delivery_price, shipping_courier, prescription_pic)
        VALUES (${dbConf.escape(req.dataToken.iduser)}, ${dbConf.escape(req.dataToken.fullname)}, ${dbConf.escape(req.dataToken.phone_number)}, ${dbConf.escape(data.invoice)}, 3, ${dbConf.escape(data.address)}, ${dbConf.escape(data.weight)},
        ${dbConf.escape(data.delivery)}, ${dbConf.escape(data.courier)}, '/prescription/${req.files[0].filename}');`)
      } else {
        // status_id = 4 menunggu pembayaran
        // from cart-checkout page

        let data = req.body.formPay;

        await dbQuery(`INSERT INTO transaction (user_id, user_name,user_phone_number, invoice_number, status_id, user_address, total_price, order_weight, delivery_price, shipping_courier)
        VALUES (${dbConf.escape(req.dataToken.iduser)}, ${dbConf.escape(req.dataToken.fullname)},${dbConf.escape(req.dataToken.phone_number)}, ${dbConf.escape(data.invoice)}, 3, ${dbConf.escape(data.address)}, ${dbConf.escape(data.total)}, ${dbConf.escape(data.weight)},
        ${dbConf.escape(data.delivery)}, ${dbConf.escape(data.courier)});`)

        let get = await dbQuery(`SELECT idtransaction FROM transaction WHERE invoice_number = ${dbConf.escape(data.invoice)};`)

        console.log(get[0].idtransaction);

        if (get[0].idtransaction > 0) {
          let temp = [];
          req.body.detail.forEach((val, idx) => {
            temp.push(`(${dbConf.escape(val.product_name)}, ${dbConf.escape(val.product_qty)}, ${dbConf.escape(val.product_unit)}, ${dbConf.escape(val.product_price)}, ${dbConf.escape(val.product_image)}, ${dbConf.escape(get[0].idtransaction)})`);
          });
          console.log(temp.join(', '));

          await dbQuery(`INSERT INTO transaction_detail (product_name, product_qty,product_unit, product_price, product_image, transaction_id) VALUES
          ${temp.join(', ')};`)
        }
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
      if (req.files) {
        let data = JSON.parse(req.body.datatransaction);
        await dbQuery(`UPDATE transaction SET payment_proof_pic='/paymentproof/${req.files[0].filename}' WHERE idtransaction = ${dbConf.escape(data.transactionId)};`)
      } else if (req.body) {
        if (req.body.order == 'ok') {
          if (req.body.status == 6) {
            await dbQuery(`UPDATE transaction SET status_id=${req.body.status + 2} WHERE idtransaction = ${dbConf.escape(req.body.id)};`)
          } else if (req.body.status == 3) {
            await dbQuery(`UPDATE transaction SET status_id=${req.body.status + 1},total_price=${req.body.price} WHERE idtransaction = ${dbConf.escape(req.body.id)};`)
            let detail = []
            req.body.recipe.map((val, idx) => {
              detail.push(`(${dbConf.escape(val.name)},${dbConf.escape(val.qty)},${dbConf.escape(val.unit)},${dbConf.escape(val.price)},${dbConf.escape(req.body.image)},${dbConf.escape(req.body.id)})`)
            })
            await dbQuery(`INSERT INTO transaction_detail (product_name,product_qty,product_unit,product_price,product_image,transaction_id)
            values ${detail.join(', ')}; `)
          } else {
            await dbQuery(`UPDATE transaction SET status_id=${req.body.status + 1} WHERE idtransaction = ${dbConf.escape(req.body.id)};`)
          }
        } else if (req.body.reason == 'Less Payment Amount') {
          await dbQuery(`UPDATE transaction SET status_id=4 WHERE idtransaction = ${dbConf.escape(req.body.id)};`)
        } else if (req.body.reason == 'Medicine Out of Stock') {
          await dbQuery(`UPDATE transaction SET status_id=7 WHERE idtransaction = ${dbConf.escape(req.body.id)};`)
        }
      }
      res.status(200).send({
        success: true,
        message: 'Transaction Updated'
      })
    } catch (error) {
      console.log(error)
      res.status(500).send(error)
    }
  },
  getReport: async (req, res) => {
    try {
      let product = await dbQuery(`SELECT date_format(date_order,'%b') as month,sum(product_qty*product_price) as product FROM transaction join transaction_detail on transaction.idtransaction=transaction_detail.transaction_id group by date_format(date_order,'%b') order by date_order;`)
      let transaction = await dbQuery(`SELECT date_format(date_order,'%b') as month,count(*) as transaction FROM transaction group by date_format(date_order,'%b') order by date_order;`)
      let user = await dbQuery(`SELECT date_format(date_order,'%b') as month,count(distinct user_id) as user FROM transaction group by date_format(date_order,'%b') order by date_order;`)

      res.status(200).send({
        product,
        transaction,
        user
      })
    } catch (error) {
      console.log(error)
      res.status(500).send(error)
    }
  }
}
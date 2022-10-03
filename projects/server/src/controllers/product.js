const { dbConf, dbQuery } = require('../config/db');

module.exports = {
    getcartdata: async (req, res) => {
        try {
            // butuh authorization token
            // sementara pakai manual data iduser = 2;
            // harus join sm tabel stock juga

            let getSql = await dbQuery(`SELECT * FROM cart c 
            JOIN product p ON c.product_id = p.idproduct 
            JOIN stock s ON s.product_id = p.idproduct
            WHERE c.user_id = ${dbConf.escape(req.dataToken.iduser)};`);

            res.status(200).send(getSql);

        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    },

    deletecart: async (req, res) => {
        try {
            await dbQuery(`DELETE FROM cart WHERE idcart=${dbConf.escape(req.params.idcart)};`);

            res.status(200).send({
                success: true,
                message: 'Delete Success'
            })
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    },

    updatecart: async (req, res) => {
        try {
            //console.log(req.body)
            if (req.body.selected){
                if(req.body.selectAll){
                    // checkbox all
                    await dbQuery(`UPDATE cart SET selected=${dbConf.escape(req.body.selected)} WHERE user_id = ${dbConf.escape(req.dataToken.iduser)};`);
                } else {
                    // checkbox satu item
                    await dbQuery(`UPDATE cart SET selected=${dbConf.escape(req.body.selected)} WHERE idcart=${dbConf.escape(req.body.idcart)};`);
                }
            } else {
                await dbQuery(`UPDATE cart SET quantity=${dbConf.escape(req.body.newQty)} WHERE idcart=${dbConf.escape(req.body.idcart)};`);
            }

            res.status(200).send({
                success: true,
                message: 'Update Success'
            })
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    }
};
const { dbConf, dbQuery } = require('../config/db');

module.exports = {
    getProduct: (req, res) => {

        let { query, sort, filterName } = req.body;

        dbConf.query(`Select * from product 
        ${filterName ? `where product_name like ('%${filterName}%')` : ''} 
        order by ${sort ? `${sort}` : `idproduct`} asc 
        limit ${dbConf.escape(query)}`,
            (err, results) => {
                if (err) {
                    return res.status(500).send(`Middlewear getProduct failed, error : ${err}`)
                }

                res.status(200).send(results);
            })
    },
    filterProduct: (req, res) => {
        let filterCategory = req.query.category_id;
        let { query, sort, filterName } = req.body;
        if(JSON.stringify(filterName) != '{}'){
            `and category_id = ${filterCategory}`
        } else {
            `where category_id = ${filterCategory}`
        }

        dbConf.query(`Select * from product 
        ${filterCategory ? `where category_id=${filterCategory}` : ''}
        ${filterName ? `and product_name like ('%${filterName}%')` : ''} 
        order by ${sort ? `${sort}` : `idproduct`} asc 
        limit ${dbConf.escape(query)}`,
            (err, results) => {
                if (err) {
                    return res.status(500).send(`Middlewear getProduct failed, error : ${err}`)
                }

                res.status(200).send(results);
            })
    },
    getProductAdmin: (req, res) => {
        let filterCategory = req.query.category_id;
        let product_name = req.query.product_name;
        console.log(product_name)
        let { limit, sort, offset } = req.body;

        if (filterCategory) {
            if (filterCategory[1]) {

                let resultFilter = filterCategory.map((val, idx) => {
                    if (idx == 0) {
                        return `(category_id = ${val}`
                    } else if (idx == (filterCategory.length - 1)) {
                        if (JSON.stringify(product_name) == '{}') {
                            return `or category_id = ${val})`
                        } else {
                            return `or category_id = ${val})`
                        }
                    } else {
                        if (JSON.stringify(product_name) == '{}') {
                            return `or category_id = ${val}`
                        } else {
                            return `or category_id = ${val}`
                        }
                    }
                })

                dbConf.query(`Select p.*, c.category_name, s.stock_unit from product p join category c on c.idcategory = p.category_id join stock s on p.idproduct=s.product_id
                ${filterCategory || product_name ? 'where' : ''} ${product_name ? `product_name like ('%${product_name}%')` : ''} ${product_name && filterCategory ? 'and' : ''} ${filterCategory ? resultFilter.join(' ') : ''}
                order by ${sort ? `${sort} asc` : `idproduct desc`} 
                limit 10 offset ${dbConf.escape(offset)}`,
                    (err, results) => {
                        if (err) {
                            return res.status(500).send(`Middlewear getProduct failed, error : ${err}`)
                        }

                        res.status(200).send(results);
                    })
            } else {
                let resultFilter = `category_id=${filterCategory}`;

                dbConf.query(`Select p.*, c.category_name, s.stock_unit from product p join category c on c.idcategory = p.category_id join stock s on p.idproduct=s.product_id
                ${filterCategory || product_name ? 'where' : ''} ${product_name ? `product_name like ('%${product_name}%')` : ''} ${product_name && filterCategory ? 'and' : ''} ${filterCategory ? resultFilter : ''}
                order by ${sort ? `${sort} asc` : `idproduct desc`} 
                ${typeof offset == typeof 'string' ? `limit ${dbConf.escape(limit)}` : `limit 10 offset ${dbConf.escape(offset)}`}`,
                    (err, results) => {
                        if (err) {
                            return res.status(500).send(`Middlewear getProduct failed, error : ${err}`)
                        }

                        res.status(200).send(results);
                    })
            }
        } else {
            let resultFilter = `category_id=${filterCategory}`;

            dbConf.query(`Select p.*, c.category_name, s.stock_unit from product p join category c on c.idcategory = p.category_id join stock s on p.idproduct=s.product_id
                ${filterCategory || product_name ? 'where' : ''} ${product_name ? `product_name like ('%${product_name}%')` : ''} ${product_name && filterCategory ? 'and' : ''} ${filterCategory ? resultFilter : ''}
                order by ${sort ? `${sort} asc` : `idproduct desc`} 
                ${typeof offset == typeof 'string' ? `limit ${dbConf.escape(limit)}` : `limit 10 offset ${dbConf.escape(offset)}`}`,
                (err, results) => {
                    if (err) {
                        return res.status(500).send(`Middlewear getProduct failed, error : ${err}`)
                    }

                    res.status(200).send(results);
                })
        }
    },
    getCategory: (req, res) => {
        dbConf.query(`Select * from category`,
            (err, results) => {
                if (err) {
                    return res.status(500).send('Middlewear getCategory failed, error :', err)
                }

                res.status(200).send(results);
            })
    },
    getcartdata: async (req, res) => {
        try {
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
    },
};

const { dbConf } = require("../config/db");

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

        // let resultFilter = filterCategory.map((val, idx) => {
        //     if (idx == 0) {
        //         if (JSON.stringify(filterName) == '{}') {
        //             return `where category_id = ${val}`
        //         } else {
        //             return `and (category_id = ${val}`
        //         }
        //     } else if (idx==(filterCategory.length-1)) {
        //         if (JSON.stringify(filterName) == '{}') {
        //             return `or category_id = ${val}`
        //         } else {
        //             return `and category_id = ${val})`
        //         }
        //     } else {
        //         if (JSON.stringify(filterName) == '{}') {
        //             return `or category_id = ${val}`
        //         } else {
        //             return `and category_id = ${val}`
        //         }
        //     }
        // })

        // dbConf.query(`Select * from product 
        //     ${JSON.stringify(filterName) != '{}' ? `where ${filterName.field} like ('%${filterName.value}%')` : ''} 
        //     ${filterCategory ? resultFilter.join(' ') : ''}
        //     order by ${sort ? `${sort}` : `idproduct`} asc 
        //     limit ${dbConf.escape(query)}`,
        //         (err, results) => {
        //             if (err) {
        //                 return res.status(500).send(`Middlewear getProduct failed, error : ${err}`)
        //             }

        //             res.status(200).send(results);
        //         })

        if(JSON.stringify(filterName) != '{}'){
            `and category_id = ${filterCategory}`
        } else {
            `where category_id = ${filterCategory}`
        }

        // let a = `Select * from product 
        // ${filterCategory ? `where category_id=${filterCategory}` : ''}
        // ${JSON.stringify(filterName) != '{}' ? `and ${filterName.field} like ('%${filterName.value}%')` : ''} 
        // order by ${sort ? `${sort}` : `idproduct`} asc 
        // limit ${dbConf.escape(query)}`

        // console.log(a)

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
    getCategory: (req, res) => {
        dbConf.query(`Select * from category`,
            (err, results) => {
                if (err) {
                    return res.status(500).send('Middlewear getCategory failed, error :', err)
                }

                res.status(200).send(results);
            })
    }
}
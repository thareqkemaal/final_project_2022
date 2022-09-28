const {dbConf, dbQuery}=require('../config/db');
const {hashPassword, createToken}=require('../confiG/encript')

module.exports={
    getData:async(req,res)=>{
        try {
            let dataUser = await dbQuery( `Select * from user u JOIN status s on u.status = s.idstatus`)
            res.status(200).send(dataUser)
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    },

    register : async (req,res)=>{
        try {
            let {name, email,phone_number, password}= req.body;
            //Get email from database
            const availableEmail = await dbQuery (`Select email from user where email = ${dbConf.escape(email)}`)
            if(availableEmail.length <= 0){
                let sqlInsert = await dbQuery(`INSERT INTO USER (name, email, phone_number, password)values(${dbConf.escape(name)}, ${dbConf.escape(email)},${dbConf.escape(phone_number)},${dbConf.escape(hashPassword(password))})`)
                if(sqlInsert.insertId){
                    let sqlGet = await dbQuery(`Select iduser, email, status from user where iduser=${sqlInsert.insertId}`)
                    let token = createToken({...sqlGet[0]},'1h')
                    res.status(200).send({
                        success :true,
                        message:'Register Success',
                        token
                    })
                }
            }
            else{
                res.status(401).send({
                    success:false,
                    message:'Email is used'
                })
            }
        } catch (error) {
            console.log('Error query SQL :', error);
            res.status(500).send(error);
        }
    },
    

}
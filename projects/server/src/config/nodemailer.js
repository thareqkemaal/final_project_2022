const nodemailer = require('nodemailer')

const transport = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.USER_MAIL,
        pass:process.env.USER_PASS
    }
})

module.exports ={
    transport
}
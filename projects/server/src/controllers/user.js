const { transport } = require('../config/nodemailer');
const { dbConf, dbQuery } = require('../config/db');
const { hashPassword, createToken } = require('../config/encript');

module.exports = {
  getData: async (req, res) => {
    try {
      let dataUser = await dbQuery(`Select * from user u JOIN status s on u.status_id = s.idstatus`)
      res.status(200).send(dataUser)
    } catch (error) {
      console.log(error)
      res.status(500).send(error)
    }
  },

  register: async (req, res) => {
    try {
      let { fullname, username, email, phone_number, password } = req.body;

      //Get email from database
      const availableEmail = await dbQuery(`Select email from user where email = ${dbConf.escape(email)}`)
      const availableUsername = await dbQuery(`Select username from user where username = ${dbConf.escape(username)}`)
      if (availableUsername.length <= 0) {
        if (availableEmail.length <= 0) {
          let sqlInsert = await dbQuery(`INSERT INTO USER (fullname,username, email, phone_number, password)values(${dbConf.escape(fullname)}, ${dbConf.escape(username)}, ${dbConf.escape(email)},${dbConf.escape(phone_number)},${dbConf.escape(hashPassword(password))})`)
          if (sqlInsert.insertId) {
            let sqlGet = await dbQuery(`Select iduser, email, status_id from user where iduser=${sqlInsert.insertId}`)
            let token = createToken({ ...sqlGet[0] }, '1h')

            // Send Email
            await transport.sendMail({
              from: 'MEDCARE ADMIN',
              to: sqlGet[0].email,
              subject: 'verification account',
              html: `<div>
                            <body style="width:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;padding:0;Margin:0"> 
                            <div class="es-wrapper-color" style="background-color:#EEEEEE"><!--[if gte mso 9]>
                                      <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                                          <v:fill type="tile" color="#eeeeee"></v:fill>
                                      </v:background>
                                  <![endif]--> 
                            <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top"> 
                              <tr style="border-collapse:collapse"> 
                                <td valign="top" style="padding:0;Margin:0"> 
                                <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
                                  <tr style="border-collapse:collapse"> 
                                    <td align="center" style="padding:0;Margin:0"> 
                                    <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" cellspacing="0" cellpadding="0" align="center"> 
                                      <tr style="border-collapse:collapse"> 
                                        <td align="left" style="Margin:0;padding-left:10px;padding-right:10px;padding-top:15px;padding-bottom:15px"><!--[if mso]><table style="width:580px" cellpadding="0" cellspacing="0"><tr><td style="width:282px" valign="top"><![endif]--> 
                                        <table class="es-left" cellspacing="0" cellpadding="0" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
                                          <tr style="border-collapse:collapse"> 
                                            <td align="left" style="padding:0;Margin:0;width:282px"> 
                                            <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                                              <tr style="border-collapse:collapse"> 
                                                <td class="es-infoblock es-m-txt-c" align="left" style="padding:0;Margin:0;line-height:14px;font-size:12px;color:#CCCCCC"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica\ neue', helvetica, sans-serif;line-height:14px;color:#CCCCCC;font-size:12px">Put your preheader text here<br></p></td> 
                                              </tr> 
                                            </table></td> 
                                          </tr> 
                                        </table><!--[if mso]></td><td style="width:20px"></td><td style="width:278px" valign="top"><![endif]--> 
                                        <table class="es-right" cellspacing="0" cellpadding="0" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right"> 
                                          <tr style="border-collapse:collapse"> 
                                            <td align="left" style="padding:0;Margin:0;width:278px"> 
                                            <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                                              <tr style="border-collapse:collapse"> 
                                                <td class="es-infoblock es-m-txt-c" align="right" style="padding:0;Margin:0;line-height:14px;font-size:12px;color:#CCCCCC"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:14px;color:#CCCCCC;font-size:12px"><a  class="view" target="_blank" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;color:#CCCCCC;font-size:12px;font-family:arial, 'helvetica neue', helvetica, sans-serif">View in browser</a></p></td> 
                                              </tr> 
                                            </table></td> 
                                          </tr> 
                                        </table><!--[if mso]></td></tr></table><![endif]--></td> 
                                      </tr> 
                                    </table></td> 
                                  </tr> 
                                </table> 
                                <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
                                  <tr style="border-collapse:collapse"></tr> 
                                  <tr style="border-collapse:collapse"> 
                                    <td align="center" style="padding:0;Margin:0"> 
                                    <table class="es-header-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#044767;width:600px" cellspacing="0" cellpadding="0" bgcolor="#044767" align="center"> 
                                      <tr style="border-collapse:collapse"> 
                                        <td align="left" style="Margin:0;padding-top:35px;padding-bottom:35px;padding-left:35px;padding-right:35px"><!--[if mso]><table style="width:530px" cellpadding="0" cellspacing="0"><tr><td style="width:340px" valign="top"><![endif]--> 
                                        <table class="es-left" cellspacing="0" cellpadding="0" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
                                          <tr style="border-collapse:collapse"> 
                                            <td class="es-m-p0r es-m-p20b" valign="top" align="center" style="padding:0;Margin:0;width:340px"> 
                                            <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                                              <tr style="border-collapse:collapse"> 
                                                <td class="es-m-txt-c" align="left" style="padding:0;Margin:0;padding-bottom:15px"><h1 style="Margin:0;line-height:72px;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;font-size:36px;font-style:normal;font-weight:bold;color:#ffffff">MEDCARE</h1></td> 
                                              </tr> 
                                            </table></td> 
                                          </tr> 
                                        </table><!--[if mso]></td><td style="width:20px"></td><td style="width:170px" valign="top"><![endif]--> 
                                        <table cellspacing="0" cellpadding="0" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                                          <tr class="es-hidden" style="border-collapse:collapse"> 
                                            <td class="es-m-p20b" align="left" style="padding:0;Margin:0;width:170px"> 
                                            <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                                              <tr style="border-collapse:collapse"> 
                                                <td style="padding:0;Margin:0;padding-bottom:5px;font-size:0" align="center"> 
                                                <table width="100%" height="100%" cellspacing="0" cellpadding="0" border="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                                                  <tr style="border-collapse:collapse"> 
                                                    <td style="padding:0;Margin:0;border-bottom:1px solid #044767;background:#FFFFFF none repeat scroll 0% 0%;height:1px;width:100%;margin:0px"></td> 
                                                  </tr> 
                                                </table></td> 
                                              </tr> 
                                              <tr style="border-collapse:collapse"> 
                                                <td style="padding:0;Margin:0"> 
                                                <table cellspacing="0" cellpadding="0" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                                                  <tr style="border-collapse:collapse"> 
                                                    <td align="center" style="padding:0;Margin:0;display:none"></td> 
                                                  </tr> 
                                                </table></td> 
                                              </tr> 
                                            </table></td> 
                                          </tr> 
                                        </table><!--[if mso]></td></tr></table><![endif]--></td> 
                                      </tr> 
                                    </table></td> 
                                  </tr> 
                                </table> 
                                <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
                                  <tr style="border-collapse:collapse"> 
                                    <td align="center" style="padding:0;Margin:0"> 
                                    <table class="es-content-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
                                      <tr style="border-collapse:collapse"> 
                                        <td style="Margin:0;padding-bottom:35px;padding-left:35px;padding-right:35px;padding-top:40px;background-color:#f7f7f7" bgcolor="#f7f7f7" align="left"> 
                                        <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                                          <tr style="border-collapse:collapse"> 
                                            <td valign="top" align="center" style="padding:0;Margin:0;width:530px"> 
                                            <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                                              <tr style="border-collapse:collapse"> 
                                                <td style="Margin:0;padding-top:20px;padding-bottom:25px;padding-left:35px;padding-right:35px;font-size:0px" align="center"><a target="_blank"  style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;color:#ED8E20;font-size:15px"><img src="https://avatars.githubusercontent.com/u/42573040?s=200&v=4" alt="ship" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" title="ship" width="150"></a></td> 
                                              </tr> 
                                              <tr style="border-collapse:collapse"> 
                                                <td align="center" style="padding:0;Margin:0;padding-bottom:15px"><h2 style="Margin:0;line-height:36px;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;font-size:30px;font-style:normal;font-weight:bold;color:#333333">MEDCARE<br></h2></td> 
                                              </tr> 
                                              <tr style="border-collapse:collapse"> 
                                                <td class="es-m-txt-l" align="left" style="padding:0;Margin:0;padding-top:20px"><h3 style="Margin:0;line-height:22px;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;font-size:18px;font-style:normal;font-weight:bold;color:#333333">Hello ${fullname},<br></h3></td> 
                                              </tr> 
                                              <tr style="border-collapse:collapse"> 
                                                <td align="left" style="padding:0;Margin:0;padding-bottom:10px;padding-top:15px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:23px;color:#333333;font-size:15px">Welcome to MEDCARE</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:23px;color:#333333;font-size:15px"><br>Please confirm your email address by clicking the button below.<br></p></td> 
                                              </tr> 
                                              <tr style="border-collapse:collapse"> 
                                                <td align="center" style="Margin:0;padding-left:10px;padding-right:10px;padding-bottom:20px;padding-top:25px"><span class="es-button-border" style="border-style:solid;border-color:transparent;background:#ed8e20;border-width:0px;display:inline-block;border-radius:5px;width:auto"><a href="${process.env.FE_URL}/verification/${token}" class="es-button es-button-1661256457075" target="_blank" style="mso-style-priority:100 !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;color:#ffffff;font-size:18px;border-style:solid;border-color:#ed8e20;border-width:15px 30px;display:inline-block;background:#ed8e20;border-radius:5px;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;font-weight:normal;font-style:normal;line-height:22px;width:auto;text-align:center">CONFIRM</a></span></td> 
                                              </tr> 
                                            </table></td> 
                                          </tr> 
                                        </table></td> 
                                      </tr> 
                                    </table></td> 
                                  </tr> 
                                </table> 
                                <table class="es-footer" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top"> 
                                  <tr style="border-collapse:collapse"> 
                                    <td align="center" style="padding:0;Margin:0"> 
                                    <table class="es-footer-body" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
                                      <tr style="border-collapse:collapse"> 
                                        <td align="left" style="Margin:0;padding-top:35px;padding-left:35px;padding-right:35px;padding-bottom:40px"> 
                                        <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                                          <tr style="border-collapse:collapse"> 
                                            <td valign="top" align="center" style="padding:0;Margin:0;width:530px"> 
                                            <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                                              <tr style="border-collapse:collapse"> 
                                                <td style="padding:0;Margin:0;padding-bottom:15px;font-size:0px" align="center"><img src="https://avatars.githubusercontent.com/u/42573040?s=200&amp;v=4" alt="Beretun logo" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" title="Beretun logo" width="37"></td> 
                                              </tr> 
                                              <tr style="border-collapse:collapse"> 
                                                <td align="center" style="padding:0;Margin:0;padding-bottom:35px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;color:#333333;font-size:14px"><strong>675 Massachusetts Avenue </strong></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;color:#333333;font-size:14px"><strong>Cambridge, MA 02139</strong></p></td> 
                                              </tr> 
                                              <tr style="border-collapse:collapse"> 
                                                <td esdev-links-color="#777777" class="es-m-txt-c" align="center" style="padding:0;Margin:0;padding-bottom:5px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;color:#777777;font-size:14px">if your account is verified, please ignore this email or&nbsp;<u><a target="_blank" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;color:#777777;font-size:14px" class="unsubscribe" href="">unsubscribe</a></u>.</p></td> 
                                              </tr> 
                                            </table></td> 
                                          </tr> 
                                        </table></td> 
                                      </tr> 
                                    </table></td> 
                                  </tr> 
                                </table> 
                                <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
                                  <tr style="border-collapse:collapse"> 
                                    <td align="center" style="padding:0;Margin:0"> 
                                    <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" cellspacing="0" cellpadding="0" align="center"> 
                                      <tr style="border-collapse:collapse"> 
                                        <td align="left" style="Margin:0;padding-left:20px;padding-right:20px;padding-top:30px;padding-bottom:30px"> 
                                        <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                                          <tr style="border-collapse:collapse"> 
                                            <td valign="top" align="center" style="padding:0;Margin:0;width:560px"> 
                                            </td> 
                                          </tr> 
                                        </table></td> 
                                      </tr> 
                                    </table></td> 
                                  </tr> 
                                </table></td> 
                              </tr> 
                            </table> 
                            </div>  
                          </body>
                            </div>`
            })
            res.status(200).send({
              success: true,
              message: 'Register Success',
              token
            })
          }
        }
        else {
          res.status(401).send({
            success: false,
            message: 'Email is used',
            error: 'email'
          })
        }
      } else {
        res.status(401).send({
          success: false,
          message: 'Username is used',
          error: 'username'
        })
      }
    } catch (error) {
      console.log('Error query SQL :', error);
      res.status(500).send({
        success: false,
        message: 'error query', error
      });
    }
  },

  login: async (req, res) => {
    try {
      let { email, password } = req.body
      let loginUser = await dbQuery(`Select u.iduser, u.fullname, u.username, u.email, u.role, u.phone_number, u.gender, u.birthdate, u.profile_pict, u.status_id, s.status_name from user u JOIN status s on u.status_id=s.idstatus
            WHERE ${dbConf.escape(email).includes('.co') ? `u.email=${dbConf.escape(email)}` :
          `u.username=${dbConf.escape(email)}`}
            and u.password=${dbConf.escape(hashPassword(password))}`)
      console.log(loginUser[0])
      if (loginUser.length > 0) {
        let token = createToken({ ...loginUser[0] })
        if (loginUser[0].status_name === 'Verified') {
          let cartUser = await dbQuery(`Select u.iduser, p.idproduct, p.product_name, p.price,
                    p.category_id, p.description, p.aturan_pakai, p.dosis,p.picture, p.netto_stock, p.netto_unit, p.default_unit,
                    c.product_id, c. quantity, p.price*c.quantity as total_price from user u
                    JOIN cart c ON u.iduser=c.user_id
                    JOIN product p ON p.idproduct = c.product_id WHERE c.user_id = ${dbConf.escape(loginUser[0].iduser)}`)

          let addressUser = await dbQuery(`Select * from address a JOIN status s on a.status_id = s.idstatus where a.user_id=${dbConf.escape(loginUser[0].iduser)}`)
          let transactionUser = await dbQuery(`Select * from transaction t where t.user_id=${dbConf.escape(loginUser[0].iduser)} `)
          res.status(200).send({
            ...loginUser[0],
            cart: cartUser,
            address: addressUser,
            transaction: transactionUser,
            token
          })
        } else {
          res.status(200).send({
            status: 'Unverified',
            ...loginUser[0],
            token
          })
        }
      } else {
        res.status(500).send({
          status: false,
          message: `The username you entered doesn't belong to an account. Please check your username and try again.`
        })
      }
    } catch (error) {
      console.log(error)
      res.status(500).send(error)
    }
  },

  keepLogin : async (req,res)=>{
        try {
            let resultUser=await dbQuery(`Select u.iduser, u.fullname, u.username, u.email, u.role, u.phone_number, u.gender, u.birthdate, u.profile_pic, u.status_id, s.status_name from user u JOIN status s on u.status_id=s.idstatus
            WHERE u.iduser=${dbConf.escape(req.dataToken.iduser)}`)
      if (resultUser.length > 0) {

        let cartUser = await dbQuery(`Select u.iduser, p.idproduct, p.product_name, p.price,
                    p.category_id, p.description, p.aturan_pakai, p.dosis,p.picture, p.netto_stock, p.netto_unit, p.default_unit,
                    c.product_id, c. quantity, p.price*c.quantity as total_price from user u
                    JOIN cart c ON u.iduser=c.user_id
                    JOIN product p ON p.idproduct = c.product_id WHERE c.user_id = ${dbConf.escape(resultUser[0].iduser)}`)

        let addressUser = await dbQuery(`Select * from address a JOIN status s on a.status_id = s.idstatus where a.user_id=${dbConf.escape(resultUser[0].iduser)}`)

        let transactionUser = await dbQuery(`Select * from transaction t where t.user_id=${dbConf.escape(resultUser[0].iduser)} `)

        let token = createToken({ ...resultUser[0] })
        res.status(200).send({
          ...resultUser[0],
          cart: cartUser,
          address: addressUser,
          transaction: transactionUser,
          token
        })
      }
    } catch (error) {
      console.log('ERROR QUERY SQL :', error);
      res.status(500).send(error)
    }

  },
  verification: async (req, res) => {
    let isToken = await dbQuery(`SELECT * FROM user where token =${dbConf.escape(req.token)}`)
    console.log(isToken)
    console.log('===============================')
    try {
      if (isToken.length > 0) {
        if (req.dataToken.iduser) {
          await dbQuery(`UPDATE user set status_id=2 WHERE iduser=${dbConf.escape(req.dataToken.iduser)}`)
          //. proses login 
          let resultUser = await dbQuery(`Select u.iduser, u.fullname, u.email, u.role, u.phone_number, u.gender, u.birthdate, u.profile_pic, u.status_id from user u

                    join status s on u.status_id = s.idstatus WHERE iduser=${dbConf.escape(req.dataToken.iduser)}`)
          if (resultUser.length > 0) {
            // login berhasil
            let token = createToken({ ...resultUser[0] })
            res.status(200).send({
              success: true,
              message: 'Verify Success',
              dataLogin: {
                ...resultUser[0],
                token
              },
              error: ''
            })
          }
        }
      } else {
        await dbQuery(`UPDATE user set status_id=2 WHERE iduser=${dbConf.escape(req.dataToken.iduser)}`)
        //. proses login 
        let resultUser = await dbQuery(`Select u.iduser, u.fullname, u.email, u.role, u.phone_number,u.token, u.gender, u.birthdate, u.profile_pic, u.status_id from user u
              join status s on u.status_id = s.idstatus WHERE iduser=${dbConf.escape(req.dataToken.iduser)}`)
        if (resultUser[0].token) {
          res.status(500).send({
            success: false,
            message: "Email has been expired",
            code: 'EMAIL_EXPIRED'
          });
        } else {
          if (resultUser.length > 0) {
            // 3. login berhasil, maka buar token baru
            let token = createToken({ ...resultUser[0] })
            res.status(200).send({
              success: true,
              message: 'Verified Success',
              dataLogin: {
                ...resultUser[0],
                token
              },
              error: ''
            })
          }
        }
      }
    } catch (error) {
      console.log(error)
      res.status(500).send({
        success: false,
        message: 'Failed',
        error
      })

    }
  },
  resendVerif: async (req, res) => {
    try {
      let sqlInsert = await dbQuery(`Select iduser,fullname,email,token, status_id From user WHERE email='${req.query.email}'`)
      await transport.sendMail({
        from: 'MEDCARE ADMIN',
        to: sqlInsert[0].email,
        subject: 'verification account',
        html: `<div>
          <body style="width:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;padding:0;Margin:0"> 
          <div class="es-wrapper-color" style="background-color:#EEEEEE"><!--[if gte mso 9]>
                    <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                        <v:fill type="tile" color="#eeeeee"></v:fill>
                    </v:background>
                <![endif]--> 
          <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top"> 
            <tr style="border-collapse:collapse"> 
              <td valign="top" style="padding:0;Margin:0"> 
              <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
                <tr style="border-collapse:collapse"> 
                  <td align="center" style="padding:0;Margin:0"> 
                  <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" cellspacing="0" cellpadding="0" align="center"> 
                    <tr style="border-collapse:collapse"> 
                      <td align="left" style="Margin:0;padding-left:10px;padding-right:10px;padding-top:15px;padding-bottom:15px"><!--[if mso]><table style="width:580px" cellpadding="0" cellspacing="0"><tr><td style="width:282px" valign="top"><![endif]--> 
                      <table class="es-left" cellspacing="0" cellpadding="0" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
                        <tr style="border-collapse:collapse"> 
                          <td align="left" style="padding:0;Margin:0;width:282px"> 
                          <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                            <tr style="border-collapse:collapse"> 
                              <td class="es-infoblock es-m-txt-c" align="left" style="padding:0;Margin:0;line-height:14px;font-size:12px;color:#CCCCCC"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica\ neue', helvetica, sans-serif;line-height:14px;color:#CCCCCC;font-size:12px">Put your preheader text here<br></p></td> 
                            </tr> 
                          </table></td> 
                        </tr> 
                      </table><!--[if mso]></td><td style="width:20px"></td><td style="width:278px" valign="top"><![endif]--> 
                      <table class="es-right" cellspacing="0" cellpadding="0" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right"> 
                        <tr style="border-collapse:collapse"> 
                          <td align="left" style="padding:0;Margin:0;width:278px"> 
                          <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                            <tr style="border-collapse:collapse"> 
                              <td class="es-infoblock es-m-txt-c" align="right" style="padding:0;Margin:0;line-height:14px;font-size:12px;color:#CCCCCC"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:14px;color:#CCCCCC;font-size:12px"><a  class="view" target="_blank" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;color:#CCCCCC;font-size:12px;font-family:arial, 'helvetica neue', helvetica, sans-serif">View in browser</a></p></td> 
                            </tr> 
                          </table></td> 
                        </tr> 
                      </table><!--[if mso]></td></tr></table><![endif]--></td> 
                    </tr> 
                  </table></td> 
                </tr> 
              </table> 
              <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
                <tr style="border-collapse:collapse"></tr> 
                <tr style="border-collapse:collapse"> 
                  <td align="center" style="padding:0;Margin:0"> 
                  <table class="es-header-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#044767;width:600px" cellspacing="0" cellpadding="0" bgcolor="#044767" align="center"> 
                    <tr style="border-collapse:collapse"> 
                      <td align="left" style="Margin:0;padding-top:35px;padding-bottom:35px;padding-left:35px;padding-right:35px"><!--[if mso]><table style="width:530px" cellpadding="0" cellspacing="0"><tr><td style="width:340px" valign="top"><![endif]--> 
                      <table class="es-left" cellspacing="0" cellpadding="0" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
                        <tr style="border-collapse:collapse"> 
                          <td class="es-m-p0r es-m-p20b" valign="top" align="center" style="padding:0;Margin:0;width:340px"> 
                          <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                            <tr style="border-collapse:collapse"> 
                              <td class="es-m-txt-c" align="left" style="padding:0;Margin:0;padding-bottom:15px"><h1 style="Margin:0;line-height:72px;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;font-size:36px;font-style:normal;font-weight:bold;color:#ffffff">MEDCARE</h1></td> 
                            </tr> 
                          </table></td> 
                        </tr> 
                      </table><!--[if mso]></td><td style="width:20px"></td><td style="width:170px" valign="top"><![endif]--> 
                      <table cellspacing="0" cellpadding="0" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                        <tr class="es-hidden" style="border-collapse:collapse"> 
                          <td class="es-m-p20b" align="left" style="padding:0;Margin:0;width:170px"> 
                          <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                            <tr style="border-collapse:collapse"> 
                              <td style="padding:0;Margin:0;padding-bottom:5px;font-size:0" align="center"> 
                              <table width="100%" height="100%" cellspacing="0" cellpadding="0" border="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                                <tr style="border-collapse:collapse"> 
                                  <td style="padding:0;Margin:0;border-bottom:1px solid #044767;background:#FFFFFF none repeat scroll 0% 0%;height:1px;width:100%;margin:0px"></td> 
                                </tr> 
                              </table></td> 
                            </tr> 
                            <tr style="border-collapse:collapse"> 
                              <td style="padding:0;Margin:0"> 
                              <table cellspacing="0" cellpadding="0" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                                <tr style="border-collapse:collapse"> 
                                  <td align="center" style="padding:0;Margin:0;display:none"></td> 
                                </tr> 
                              </table></td> 
                            </tr> 
                          </table></td> 
                        </tr> 
                      </table><!--[if mso]></td></tr></table><![endif]--></td> 
                    </tr> 
                  </table></td> 
                </tr> 
              </table> 
              <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
                <tr style="border-collapse:collapse"> 
                  <td align="center" style="padding:0;Margin:0"> 
                  <table class="es-content-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
                    <tr style="border-collapse:collapse"> 
                      <td style="Margin:0;padding-bottom:35px;padding-left:35px;padding-right:35px;padding-top:40px;background-color:#f7f7f7" bgcolor="#f7f7f7" align="left"> 
                      <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                        <tr style="border-collapse:collapse"> 
                          <td valign="top" align="center" style="padding:0;Margin:0;width:530px"> 
                          <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                            <tr style="border-collapse:collapse"> 
                              <td style="Margin:0;padding-top:20px;padding-bottom:25px;padding-left:35px;padding-right:35px;font-size:0px" align="center"><a target="_blank"  style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;color:#ED8E20;font-size:15px"><img src="https://avatars.githubusercontent.com/u/42573040?s=200&v=4" alt="ship" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" title="ship" width="150"></a></td> 
                            </tr> 
                            <tr style="border-collapse:collapse"> 
                              <td align="center" style="padding:0;Margin:0;padding-bottom:15px"><h2 style="Margin:0;line-height:36px;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;font-size:30px;font-style:normal;font-weight:bold;color:#333333">MEDCARE<br></h2></td> 
                            </tr> 
                            <tr style="border-collapse:collapse"> 
                              <td class="es-m-txt-l" align="left" style="padding:0;Margin:0;padding-top:20px"><h3 style="Margin:0;line-height:22px;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;font-size:18px;font-style:normal;font-weight:bold;color:#333333">Hello ${sqlInsert[0].fullname},<br></h3></td> 
                            </tr> 
                            <tr style="border-collapse:collapse"> 
                              <td align="left" style="padding:0;Margin:0;padding-bottom:10px;padding-top:15px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:23px;color:#333333;font-size:15px">Welcome to MEDCARE</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:23px;color:#333333;font-size:15px"><br>Please confirm your email address by clicking the button below.<br></p></td> 
                            </tr> 
                            <tr style="border-collapse:collapse"> 
                              <td align="center" style="Margin:0;padding-left:10px;padding-right:10px;padding-bottom:20px;padding-top:25px"><span class="es-button-border" style="border-style:solid;border-color:transparent;background:#ed8e20;border-width:0px;display:inline-block;border-radius:5px;width:auto"><a href="${process.env.FE_URL}/verification/${sqlInsert[0].token}" class="es-button es-button-1661256457075" target="_blank" style="mso-style-priority:100 !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;color:#ffffff;font-size:18px;border-style:solid;border-color:#ed8e20;border-width:15px 30px;display:inline-block;background:#ed8e20;border-radius:5px;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;font-weight:normal;font-style:normal;line-height:22px;width:auto;text-align:center">CONFIRM</a></span></td> 
                            </tr> 
                          </table></td> 
                        </tr> 
                      </table></td> 
                    </tr> 
                  </table></td> 
                </tr> 
              </table> 
              <table class="es-footer" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top"> 
                <tr style="border-collapse:collapse"> 
                  <td align="center" style="padding:0;Margin:0"> 
                  <table class="es-footer-body" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"> 
                    <tr style="border-collapse:collapse"> 
                      <td align="left" style="Margin:0;padding-top:35px;padding-left:35px;padding-right:35px;padding-bottom:40px"> 
                      <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                        <tr style="border-collapse:collapse"> 
                          <td valign="top" align="center" style="padding:0;Margin:0;width:530px"> 
                          <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                            <tr style="border-collapse:collapse"> 
                              <td style="padding:0;Margin:0;padding-bottom:15px;font-size:0px" align="center"><img src="https://avatars.githubusercontent.com/u/42573040?s=200&amp;v=4" alt="Beretun logo" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" title="Beretun logo" width="37"></td> 
                            </tr> 
                            <tr style="border-collapse:collapse"> 
                              <td align="center" style="padding:0;Margin:0;padding-bottom:35px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;color:#333333;font-size:14px"><strong>675 Massachusetts Avenue </strong></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;color:#333333;font-size:14px"><strong>Cambridge, MA 02139</strong></p></td> 
                            </tr> 
                            <tr style="border-collapse:collapse"> 
                              <td esdev-links-color="#777777" class="es-m-txt-c" align="center" style="padding:0;Margin:0;padding-bottom:5px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;color:#777777;font-size:14px">if your account is verified, please ignore this email or&nbsp;<u><a target="_blank" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;color:#777777;font-size:14px" class="unsubscribe" href="">unsubscribe</a></u>.</p></td> 
                            </tr> 
                          </table></td> 
                        </tr> 
                      </table></td> 
                    </tr> 
                  </table></td> 
                </tr> 
              </table> 
              <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
                <tr style="border-collapse:collapse"> 
                  <td align="center" style="padding:0;Margin:0"> 
                  <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" cellspacing="0" cellpadding="0" align="center"> 
                    <tr style="border-collapse:collapse"> 
                      <td align="left" style="Margin:0;padding-left:20px;padding-right:20px;padding-top:30px;padding-bottom:30px"> 
                      <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                        <tr style="border-collapse:collapse"> 
                          <td valign="top" align="center" style="padding:0;Margin:0;width:560px"> 
                          </td> 
                        </tr> 
                      </table></td> 
                    </tr> 
                  </table></td> 
                </tr> 
              </table></td> 
            </tr> 
          </table> 
          </div>  
        </body>
          </div>`
      })
      res.status(200).send({
        success:true,
        message:'Register Success'
      })
      } catch (error) {
        console.log(error)
      }
    },
       editProfile : async (req,res)=>{
      try {
        let data=JSON.parse(req.body.data)
        let availableUsername = await dbQuery(`Select username from user where username = ${dbConf.escape(data.username)}`)
        let availableEmail = await dbQuery(`Select username from user where username = ${dbConf.escape(data.email)}`)
            let dataInput = []
            for (const key in data) {
              dataInput.push(`${key}=${dbConf.escape(data[key])}`)
            }
            if(req.files.length>0){
              dataInput.push(`profile_pic=${dbConf.escape(`/img_profile${req.files[0].filename}`)}`)
                    try {
                      await dbQuery(`UPDATE user set ${dataInput.join(',')}where iduser =${req.dataToken.iduser}`)
                    } catch (error) {
                        return res.status(500).send({
                          message: error
                        })
                    }
            }else{
              await dbQuery(`UPDATE user set ${dataInput.join(',')}where iduser =${req.dataToken.iduser}`)
            }
            let resultUser=await dbQuery(`Select u.iduser, u.fullname, u.username, u.email, u.role, u.phone_number, u.gender, u.birthdate, u.profile_pic, u.status_id, s.status_name from user u JOIN status s on u.status_id=s.idstatus
            WHERE u.iduser=${dbConf.escape(req.dataToken.iduser)}`)

            let cartUser = await dbQuery(`Select u.iduser, p.idproduct, p.product_name, p.price,
                    p.category_id, p.description, p.aturan_pakai, p.dosis,p.picture, p.netto_stock, p.netto_unit, p.default_unit,
                    c.product_id, c. quantity, p.price*c.quantity as total_price from user u
                    JOIN cart c ON u.iduser=c.user_id
                    JOIN product p ON p.idproduct = c.product_id WHERE c.user_id = ${dbConf.escape(resultUser[0].iduser)}`)

                    let addressUser = await dbQuery(`Select * from address a JOIN status s on a.status_id = s.idstatus where a.user_id=${dbConf.escape(resultUser[0].iduser)}`)

                    let token = createToken({...resultUser[0]})

                    res.status(200).send({
                      ...resultUser[0],
                      cart:cartUser,
                      address:addressUser,
                      token
                    })
      } catch (error) {
        console.log(error)
        res.status(500).send({
          message: error
        })
      }
    },

}
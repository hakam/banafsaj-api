const db = require("../models");
const Users = db.users;
const Department = db.departments
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const config = require("../config/auth.config");
const QueryTypes = require('sequelize');
const { Op } = require("sequelize");
const DataLoader = require('../config/core/dataloader')
const Role_permission = db.role_permission;

const smtpTransport = require('nodemailer-smtp-transport');
const nodemailer = require('nodemailer');


//setup nodemailer
let transporter = nodemailer.createTransport(smtpTransport({
    host: 'smtp.office365.com',
    port: 587,
    secureConnection: false,
    auth: {
        user: 'notification@sened.ngo',
        pass: 'ER2026notisys00'
    },
    tls: {
        ciphers: 'SSLv3'

    }


}));

exports.create = (req, res) => {

    const pass = { password: bcrypt.hashSync(req.body.password, 8) };
    const allData = Object.assign(req.body, pass);

    // Save Users in the database

    Users.create(allData)
        .then(data => {

            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Users."
            });
        });
};

exports.findAll = async (req, res) => {

    try {
        const dataLoader = new DataLoader('users', req.query)
        const result = await dataLoader.load()
        res.json(result)

    } catch (error) {
        res.status(500).send({
            message:
                error.message || "Some error occurred while retrieving Transactionss."
        });
    }

};
exports.findOne = (req, res) => {
    const id = req.params.id;

    Users.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Users with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Users.update(req.body, {
        where: { id: id },
        individualHooks: true

    })
        .then(num => {
            if (num[0] == 1) {
                res.send({
                    message: "Users was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Users with id=${id}. Maybe Users was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Users with id=" + id
            });
        });
};
exports.delete = (req, res) => {
    const id = req.params.id;
    Users.destroy({
        where: { id: id },
        individualHooks: true

    })
        .then(num => {
            if (num[0] == 1) {
                res.send({
                    message: "Users was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Users with id=${id}. Maybe Users was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Users with id=" + id
            });
        });
};
exports.signin = (req, res) => {

    //     for( let key in Users.rawAttributes ){
    //         console.log('Field: ', key); // this is name of the field
    //         console.log('Type: ', Users.rawAttributes[key].type.toSql()); // Sequelize type of field
    //     }

    //     Object.keys(Users.rawAttributes)
    //   .forEach(function eachKey(key) { 
    //    console.log(key); // alerts key 
    //    console.log(key.type)
    //   });
    //     console.log(Users.rawAttributes);
    Users.findOne({
        where: {
            username: req.body.username
        }
    })
        .then(async user => {
            if (!user) {
                return res.status(403).send({ message: "User Not found." });
            }
            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(403).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }
            if (user.status != 1) {
                return res.status(403).send({ message: 'User Disabled' })
            }
            // var RolePermissions = await Role_permission.findAll({ where: { roleId: user.roleId } })

            var token = jwt.sign({
                id: user.id,
                username: user.username,
                email: user.email,
                token: token,
                firstName: user.firstName,
                branchId: user.branchId,
                departmentId: user.departmentId,
                roleId: user.roleId,
                lastName: user.lastName,
                hod: user.hod,
                designationId: user.designationId,
                reportToId: user.reportToId,
                avatar: user.avatar,
                employeeId:user.employeeId,
                employeeCode: user.employeeCode
            }, config.secret, {
                expiresIn: 86400// 86400 // 24 hours
            });
            var refreshToken = jwt.sign({
                refreshToken: "refresh",
                username: user.username,
                branchId: user.branchId,
                departmentId: user.departmentId,
                roleId: user.roleId,
                id: user.id,
                hod: user.hod,
                reportToId: user.reportToId,
                avatar: user.avatar,
                employeeId:user.employeeId,
                designationId: user.designationId,
                employeeCode: user.employeeCode
                //  rolePermissions: RolePermissions
            }, config.secret, {
                expiresIn: 90 // 24 hours
            });

            res.status(200).send({
                id: user.id,
                username: user.username,
                email: user.email,
                token: token,
                firstName: user.firstName,
                branchId: user.branchId,
                departmentId: user.departmentId,
                roleId: user.roleId,
                lastName: user.lastName,
                refreshToken: refreshToken,
                hod: user.hod,
                employeeId:user.employeeId,
                reportToId: user.reportToId,
                avatar: user.avatar,
                designationId: user.designationId,
                employeeCode: user.employeeCode
                //  rolePermissions: RolePermissions
            });

        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};
exports.restPassword = async function (req, res) {
    let uuid = req.body.id
    const pass = { password: bcrypt.hashSync(req.body.password, 8) };
    Users.update(pass, {
        where: { id: uuid }
    })
        .then(num => {
            if (num[0] == 1) {
                res.send({
                    message: "Users was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Users with id=${uuid}. Maybe Users was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Users with id=" + uuid
            });
        });
}

exports.refreshToken = async (req, res) => {

    try {
        var decoded = jwt.verify(req.body.Data,config.secret);
        let name = decoded.username
        if (name && name != undefined) {
            let rawResult = await Users.findOne({ where: { username: name } })
            if (!rawResult || rawResult == undefined) {
                return res.status(403).send({ message: 'User not exist' })
            } else if (rawResult.status != 1) {
                return res.status(403).send({ message: 'User Disabled' })
            } else {
                let userData = rawResult
                var refreshToken = jwt.sign({
                    refreshToken: "refresh",
                 username: userData.username,
                 branchId: userData.branchId,
                 departmentId: userData.departmentId,
                 roleId: userData.roleId,
                 id: userData.id,
                 hod: userData.hod,
                 employeeId:userData.employeeId,
                 reportToId: userData.reportToId,
                avatar: userData.avatar,
                designationId: userData.designationId,
                employeeCode: userData.employeeCode
                //  rolePermissions: RolePermissions
                   }, config.secret, {
                    expiresIn: 120 // 24 hours
                });
                await Users.update({ refreshToken: refreshToken }, {
                    where: { id: userData.id }
                })
                res.status(200).send({
                    refreshToken: refreshToken
                });
            }
    }
      } catch(err) {
        console.log(err);
        return res.sendStatus(403);
       
      }



  
       

    
    
}


exports.SendResetMail = async (req, res) => {

    let code = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    let ip = req.headers['x-real-ip'] || req.connection.remoteAddress
    let url = "https://erp.sened.ngo/#/pages/authentication/reset-password/" + code
    let from = `Sened ERP System <notification@sened.ngo>`
    let mail = req.body.email
    const mailOptions = {
        from: from,
        to: req.body.email,                   // from req.body.to
        subject: "Reset Password Link",         //from req.body.subject
        html: `<!DOCTYPE html>
        <html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
        
          <head>
            <meta charset="utf-8">
            <meta name="x-apple-disable-message-reformatting">
            <meta http-equiv="x-ua-compatible" content="ie=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
            <!--[if mso]>
            <xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml>
            <style>
              td,th,div,p,a,h1,h2,h3,h4,h5,h6 {font-family: "Segoe UI", sans-serif; mso-line-height-rule: exactly;}
            </style>
          <![endif]-->
            <title>Reset your Password</title>
            <link href="https://fonts.googleapis.com/css?family=Montserrat:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700" rel="stylesheet" media="screen">
            <style>
              .hover-underline:hover {
                text-decoration: underline !important;
              }
        
              @keyframes spin {
                to {
                  transform: rotate(360deg);
                }
              }
        
              @keyframes ping {
        
                75%,
                100% {
                  transform: scale(2);
                  opacity: 0;
                }
              }
        
              @keyframes pulse {
                50% {
                  opacity: .5;
                }
              }
        
              @keyframes bounce {
        
                0%,
                100% {
                  transform: translateY(-25%);
                  animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
                }
        
                50% {
                  transform: none;
                  animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
                }
              }
        
              @media (max-width: 600px) {
                .sm-px-24 {
                  padding-left: 24px !important;
                  padding-right: 24px !important;
                }
        
                .sm-py-32 {
                  padding-top: 32px !important;
                  padding-bottom: 32px !important;
                }
        
                .sm-w-full {
                  width: 100% !important;
                }
              }
            </style>
          </head>
        
          <body style="margin: 0; padding: 0; width: 100%; word-break: break-word; -webkit-font-smoothing: antialiased; --bg-opacity: 1; background-color: #eceff1; background-color: rgba(236, 239, 241, var(--bg-opacity));">
            <div style="display: none;">A request to reset password was received from your PixInvent Account</div>
            <div role="article" aria-roledescription="email" aria-label="Reset your Password" lang="en">
              <table style="font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif; width: 100%;" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td align="center" style="--bg-opacity: 1; background-color: #eceff1; background-color: rgba(236, 239, 241, var(--bg-opacity)); font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif;" bgcolor="rgba(236, 239, 241, var(--bg-opacity))">
                    <table class="sm-w-full" style="font-family: 'Montserrat',Arial,sans-serif; width: 600px;" width="600" cellpadding="0" cellspacing="0" role="presentation">
                    <tr>
                    <td class="sm-py-32 sm-px-24" style="font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif; padding: 48px; text-align: center;" align="center">
                      <a href="https://erp.sened.ngo/">
                        <img src="https://erp.sened.ngo/assets/images/logo/logo.png" width="155" alt="Sened ERP" style="border: 0; max-width: 100%; line-height: 100%; vertical-align: middle;">
                      </a>
                    </td>
                  </tr>
                      <tr>
                        <td align="center" class="sm-px-24" style="font-family: 'Montserrat',Arial,sans-serif;">
                          <table style="font-family: 'Montserrat',Arial,sans-serif; width: 100%;" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                            
                          <tr>
                              <td class="sm-px-24" style="--bg-opacity: 1; background-color: #ffffff; background-color: rgba(255, 255, 255, var(--bg-opacity)); border-radius: 4px; font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif; font-size: 14px; line-height: 24px; padding: 48px; text-align: left; --text-opacity: 1; color: #626262; color: rgba(98, 98, 98, var(--text-opacity));" bgcolor="rgba(255, 255, 255, var(--bg-opacity))" align="left">
                               
                                <p style="margin: 0 0 24px;">
                                  A request to reset password was received from your
                                  <span style="font-weight: 600;">Sened ERP</span> Account -
                                  <a href="`+ req.body.email + `" class="hover-underline" style="--text-opacity: 1; color: #0061AF; color: rgba(115, 103, 240, var(--text-opacity)); text-decoration: none;">` + req.body.email + `</a>
                                   from the IP - <span style="font-weight: 600;">`+ ip + `</span> .
                                </p>
                                <p style="margin: 0 0 24px;">Use this link to reset your password and login.</p>
                                <a href="`+ url + `" style="display: block; font-size: 14px; line-height: 100%; margin-bottom: 24px; --text-opacity: 1; color: #0061AF; color: rgba(115, 103, 240, var(--text-opacity)); text-decoration: none;">` + url + `</a>
                                <table style="font-family: 'Montserrat',Arial,sans-serif;" cellpadding="0" cellspacing="0" role="presentation">
                                  <tr>
                                    <td style="mso-padding-alt: 16px 24px; --bg-opacity: 1; background-color: #0061AF; background-color: rgba(115, 103, 240, var(--bg-opacity)); border-radius: 4px; font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif;" bgcolor="rgba(115, 103, 240, var(--bg-opacity))">
                                      <a href="`+ url + `" style="display: block; font-weight: 600; font-size: 14px; line-height: 100%; padding: 16px 24px; --text-opacity: 1; color: #ffffff; color: rgba(255, 255, 255, var(--text-opacity)); text-decoration: none;">Reset Password &rarr;</a>
                                    </td>
                                  </tr>
                                </table>
                                <p style="margin: 24px 0;">
                                  <span style="font-weight: 600;">Note:</span> This link is valid for 1 Time  and can be used to change your password only once.
                                </p>
                                <p style="margin: 0;">
                                  If you did not intend to Rest your account Password or need our help , please
                                  contact us at
                                  <a href="mailto:support@sened.ngo" class="hover-underline" style="--text-opacity: 1; color: #0061AF; color: rgba(115, 103, 240, var(--text-opacity)); text-decoration: none;">support@sened.ngo</a>
                                </p>
                                <table style="font-family: 'Montserrat',Arial,sans-serif; width: 100%;" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                                  <tr>
                                    <td style="font-family: 'Montserrat',Arial,sans-serif; padding-top: 32px; padding-bottom: 32px;">
                                      <div style="--bg-opacity: 1; background-color: #eceff1; background-color: rgba(236, 239, 241, var(--bg-opacity)); height: 1px; line-height: 1px;">&zwnj;</div>
                                    </td>
                                  </tr>
                                </table>
                                <p style="margin: 0 0 16px;">
                                  Not sure why you received this email? Please
                                  <a href="mailto:support@sened.ngo" class="hover-underline" style="--text-opacity: 1; color: #0061AF; color: rgba(115, 103, 240, var(--text-opacity)); text-decoration: none;">let us know</a>.
                                </p>
                                <p style="margin: 0 0 16px;">Thanks, <br>The Sened ERP Team</p>
                              </td>
                            </tr>
                            <tr>
                              <td style="font-family: 'Montserrat',Arial,sans-serif; height: 20px;" height="20"></td>
                            </tr>
                     
                            <tr>
                              <td style="font-family: 'Montserrat',Arial,sans-serif; height: 16px;" height="16"></td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </div>
          </body>
        
        </html>`           //from req.body.message
    };

    await Users.update({ resetPassCode: code }, {
        where: { email: req.body.email }
    })
        .then(async num => {
            if (num[0] == 1) {

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                        res.status(500).send({
                            message:
                                error.message || "Some error occurred while creating the Users."
                        });
                    } else {
                        res.send(info);
                        console.log('Email sent: ' + info);
                    }
                });
            } else {
                res.send({
                    message: `Cannot update Users with . Maybe Users was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Users with id="
            });
        });



    //options


    //delivery



    // const pass = { password: bcrypt.hashSync(req.body.password, 8) };
    // const allData = Object.assign(req.body, pass);

    // // Save Users in the database

    // Users.create(allData)
    //     .then(data => {
    //         res.send(data);
    //     })
    //     .catch(err => {
    //         res.status(500).send({
    //             message:
    //                 err.message || "Some error occurred while creating the Users."
    //         });
    //     });
};
exports.ResetPassByMail = async (req, res) => {

    let uuid = req.body.id
    const pass = { password: bcrypt.hashSync(req.body.password, 8) };

    Users.update(pass, {
        where: { resetPassCode: uuid }
    })
        .then(async num => {
            if (num[0] == 1) {

                await Users.update({ resetPassCode: '' }, {
                    where: { resetPassCode: uuid }
                }).then(num => {
                    if (num[0] == 1) {
                        res.send({
                            message: "Password was updated successfully."
                        });
                    } else {
                        res.send({
                            message: `Cannot update Users with . Maybe Users was not found or req.body is empty!`
                        });
                    }
                })

            } else {
                res.send({
                    message: `Cannot update Users with id=${uuid}. Maybe Users was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Users with id=" + uuid
            });
        });




    //options


    //delivery



    // const pass = { password: bcrypt.hashSync(req.body.password, 8) };
    // const allData = Object.assign(req.body, pass);

    // // Save Users in the database

    // Users.create(allData)
    //     .then(data => {
    //         res.send(data);
    //     })
    //     .catch(err => {
    //         res.status(500).send({
    //             message:
    //                 err.message || "Some error occurred while creating the Users."
    //         });
    //     });
};
const nodemailer = require('nodemailer');
const config = require("../config/auth.config");
var jwt = require("jsonwebtoken");

exports.sendConfirmation = function sendConfirmation(to) {
    const transpoter = nodemailer.createTransport({
        host: 'smtp.mail.ru',
        port: 465,
        secure: true,
        auth: {
            user: 'my-progress@bk.ru',
            pass: 'swUTQ4dGsVD5cnCqfqs5',
        },
        tls: {
            rejectUnauthorized: false,
        },
    });

    const mailOptions = {
        from: '"MY-PROGRESS.RU" <my-progress@bk.ru>',
        to: to,
        subject: 'Test subject',
        text: 'Для подтверждения почты перейдите по ссылке - http://localhost:8080/confirm?token=' + jwt.sign({email: to}, config.secret),
    };

    transpoter.sendMail(mailOptions, (err, info) => {
        console.log(err, info);
    });
}
const nodemailer = require('nodemailer');

const transpoter = nodemailer.createTransport({
    host: 'smtp.mail.ru',
    port: 465,
    secure: true,
    auth: {
        user: 'lut100@bk.ru',
        pass: 'Kgu9iuRByT3XmTtJqgNX',
    },
    tls: {
        rejectUnauthorized: false,
    },
});

const mailOptions = {
    from: '"MY-PROGRESS.RU" <lut100@bk.ru>',
    to: 'oleg10047@gmail.com',
    subject: 'Test subject',
    text: 'Hello',
};

transpoter.sendMail(mailOptions, (err, info) => {
    console.log(err, info);
});
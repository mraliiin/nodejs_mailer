const express = require('express');
const app = express();
const HttpStatus = require('http-status-codes');
const mailer = require("nodemailer");
const chalk = require('chalk');

let CONFIG = require('./config');
let DATA = require('./data');

// Sending emails
let smtpTransport = mailer.createTransport('direct', {
    debug: true
});

// ROUTES
app.get('/', (req, res) => {
    res.send('Hello World!\n');
});

app.all('/send', (req, res, next) => {
    let mail = CONFIG.emailDefaults;

    let errorMessage = '';

    DATA.emails.forEach((to) => {
        mail.to = to;
        console.log(chalk.yellow(`Sending mail to ${to}`));

        smtpTransport.sendMail(mail, (error, response) => {
            if (error) errorMessage += error;
            smtpTransport.close();
        });
    })

    if (errorMessage) return res.status(401).send({'message' : errorMessage});
    return res.send({"message": "mails sent!"});
});

app.listen(CONFIG.port, () => {
    console.log(chalk.red(`----Server started on port ${CONFIG.port}`));
});
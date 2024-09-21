require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');

const app = express();


sgMail.setApiKey(process.env.SENDGRID_API_KEY);


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});


app.post('/', async (req, res) => {
    const email = req.body.email;

    const msg = {
        to: email,
        from: 'sambhav4808.be23@chitkara.edu.in',
        subject: 'Thanks for subscribing',
        text: 'You have joined the platinum membership of our firm',
    };

    try {
        const response = await sgMail.send(msg);
        console.log('Email sent successfully :=)', response);
        res.send("Subscription successful! Check your email.");
    } catch (error) {
        console.error('Error while sending the email:', error.response ? error.response.body : error);
        res.send("Sorry there was an error! Please try again.");
    }
});


app.listen(8000, () => {
    console.log("Server is running on port 8000");
});

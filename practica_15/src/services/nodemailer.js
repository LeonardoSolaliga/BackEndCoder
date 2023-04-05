import nodemailer from 'nodemailer'

const GMAIL_PWD = 'ishujxivijablmcl';
const GMAIL_USER = "leo.nosecuanto@gmail.com";

const transporter = nodemailer.createTransport({
    service:'gmail',
    port: 587,
    auth: {
        user: GMAIL_USER,
        pass: GMAIL_PWD
    }
});


export default transporter;
/* import nodemailer from 'nodemailer';
import { google } from 'googleapis';

const CLIENT_ID = process.env.GMAIL_CLIENT_ID;
const CLIENT_SECRET = process.env.GMAIL_CLIENT_SECRET;
const REDIRECT_URI = "http://localhost:3000"
const REFRESH_TOKEN = process.env.GMAIL_REFRESH_TOKEN;
console.log({CLIENT_ID,CLIENT_SECRET,REDIRECT_URI,REFRESH_TOKEN,Email:process.env.EMAIL_USER});

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function createTransporter() {
  const accessToken = await oAuth2Client.getAccessToken();

  console.log({codigodeacceso:accessToken});

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host:"smtp.gmail.com",
    port:465,
    secure:true,
    auth: {
      type: 'OAuth2',
      user: process.env.EMAIL_USER,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
      accessToken: accessToken.token,
    },
  });

  console.log({transporte:transporter});

  return transporter;
}

export default createTransporter; */

import nodemailer from 'nodemailer';

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD; // Contraseña de aplicación

const createTransporter = () => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true para el puerto 465, false para el puerto 587
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASSWORD,
    },
  });

  return transporter;
};

export default createTransporter;
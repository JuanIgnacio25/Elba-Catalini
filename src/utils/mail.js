import transporter from "@/libs/nodemailer";

async function sendEmail({ to, subject, text }) {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text
    };

    const result = await transporter.sendMail(mailOptions);
    return result;
  } catch (error) {
    console.error('Error al enviar el email:', error);
    throw error;
  }
}

export default sendEmail;
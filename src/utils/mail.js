import createTransporter from "@/libs/nodemailer";

async function sendEmail({ to, subject, text }) {
  try {
    const transporter = await createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text
    };

    const result = await transporter.sendMail(mailOptions);
    console.log(`Email sent ${result}`);
    return result;
  } catch (error) {
    console.error('Error al enviar el email:', error);
    throw error;
  }
}

export default sendEmail;
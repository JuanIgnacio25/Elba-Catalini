import createTransporter from "@/libs/nodemailer";

const sendRecoveryTokenMail = async (userEmail, recoveryToken) => {
  const transporter = createTransporter();

  try {
    await transporter.sendMail({
      from: `LaCasaDelAccesorio <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: "Link de verificacion de cuenta",
      text: `Para recuperar su contraseña ingrese en el siguiente link:
       ${process.env.NEXT_PUBLIC_WEBSITE_DOMAIN}/auth/password-recovery/${recoveryToken}`,
    });
  } catch (error) {
    throw error;
  }
};

export default sendRecoveryTokenMail;
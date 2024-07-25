import createTransporter from "@/libs/nodemailer";

const sendVerificationMail = async (userEmail, verificationToken) => {
  const transporter = createTransporter();

  try {
    await transporter.sendMail({
      from: `LaCasaDelAccesorio <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: "Link de verificacion de cuenta",
      text: `Verifique su cuenta clickeando en el siguiente link:
       ${process.env.NEXT_PUBLIC_WEBSITE_DOMAIN}/api/auth/verify-account/${verificationToken}`,
    });
  } catch (error) {
    throw error;
  }
};

export default sendVerificationMail;

import createTransporter from "@/libs/nodemailer";

const sendVerificationMail = async (userEmail, verificationToken) => {
  const transporter = createTransporter();

  try {
    await transporter.sendMail({
      from: `LaCasaDelAccesorio <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: "Link de verificacion de cuenta",
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; width: 100%; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9; box-sizing: border-box;">
        <h2 style="color: #333; text-align: center;">Verificacion de Cuenta</h2>
        <p style="color: #555;">Gracias por registrarte. Para verificar tu cuenta, haz clic en el botón de abajo:</p>
        <div style="text-align: center; margin: 20px 0;">
          <a href="${recoveryLink}" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #fff; background-color: #ef4444; text-decoration: none; border-radius: 5px; transition: background-color 0.3s ease">Verificar Cuenta</a>
        </div>
        <p style="color: #555;">Si no creaste esta cuenta, puedes ignorar este mensaje.</p>
        <p style="color: #999; font-size: 12px; text-align: center;">Este enlace expirará en 1 hora.</p>
      </div>
      <style>
        a:hover {
          background-color: #b91c1c !important;
        }
        @media screen and (max-width: 480px) {
          div {
            padding: 15px !important;
          }
          h2 {
            font-size: 20px !important;
          }
          p {
            font-size: 14px !important;
          }
          a {
            font-size: 14px !important;
            padding: 8px 15px !important;
          }
        }
      </style>
    `,
    });
  } catch (error) {
    throw error;
  }
};

export default sendVerificationMail;

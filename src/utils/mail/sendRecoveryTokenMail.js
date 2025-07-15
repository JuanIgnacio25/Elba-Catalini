import createTransporter from "@/lib/nodemailer";

const sendRecoveryTokenMail = async (userEmail, recoveryToken) => {
  const transporter = createTransporter();
  const recoveryLink = `${process.env.NEXT_PUBLIC_WEBSITE_DOMAIN}/auth/password-recovery/${recoveryToken}`;

  const mailOptions = {
    from: `Elba Susana Catalini <${process.env.EMAIL_USER}>`,
    to: userEmail,
    subject: "Recuperación de Cuenta",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; width: 100%; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9; box-sizing: border-box;">
        <h2 style="color: #333; text-align: center;">Recuperación de Cuenta</h2>
        <p style="color: #555;">Hemos recibido una solicitud para restablecer tu contraseña. Para continuar, haz clic en el botón de abajo:</p>
        <div style="text-align: center; margin: 20px 0;">
          <a href="${recoveryLink}" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #fff; background-color: #ef4444; text-decoration: none; border-radius: 5px; transition: background-color 0.3s ease">Restablecer Contraseña</a>
        </div>
        <p style="width: 100%; text-align:center; color: #555;">Si no solicitaste este cambio, puedes ignorar este mensaje.</p>
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
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw error;
  }
};

export default sendRecoveryTokenMail;

import createTransporter from "@/lib/nodemailer";

const sendContactMessageMail = async (data) => {
  const transporter = createTransporter();
  

  const htmlContent = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          margin: 0;
          padding: 0;
          color: #333;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f9f9f9;
          border: 1px solid #ddd;
          border-radius: 5px;
        }
        .header {
          text-align: center;
          margin-bottom: 20px;
        }
        .header h1 {
          font-size: 24px;
          color: #D72323;
        }
        .section {
          margin-bottom: 20px;
        }
        .section h2 {
          font-size: 18px;
          color: #D72323;
          margin-bottom: 10px;
        }
        .section p {
          font-size: 16px;
          margin: 0;
        }
        .footer {
          text-align: center;
          font-size: 14px;
          color: #888;
          margin-top: 20px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Consulta recibida</h1>
        </div>
        <div class="section">
          <h2>Información del Usuario</h2>
          <p><strong>Nombre completo:</strong> ${data.fullName}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Ubicación:</strong> ${data.location}</p>
        </div>
        <div class="section">
          <h2>Consulta</h2>
          <p>${data.message}</p>
        </div>
      </div>
    </body>
  </html>
`;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `Consulta de ${data.company}`,
      html: htmlContent,
    });
  } catch (error) {
    throw error;
  }
};

export default sendContactMessageMail;

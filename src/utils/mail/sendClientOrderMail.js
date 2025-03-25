import createTransporter from "@/libs/nodemailer";

async function sendClientOrderEmail(customerEmail, orderItems , orderId) {
  // Formatear los elementos del pedido en HTML
  const orderItemsHtml = orderItems
    .map(
      (item) => `
        <tr>
          <td style="padding: 8px 12px; border: 1px solid #ddd; text-align: center; font-weight: 500;">${item.name}</td>
          <td style="padding: 8px 12px; border: 1px solid #ddd; text-align: center; font-weight: 500;">${item.unit}</td>
          <td style="padding: 8px 12px; border: 1px solid #ddd; text-align: center; font-weight: 500;">${item.quantity}</td>
        </tr>
    `
    )
    .join("");

  const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        .email-container {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: auto;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 5px;
        }
        .header-logo {
          display: flex;
          align-items: center;
          background-color: #cdc8c6;
          padding: 10px;
          color: white;
        }
        .header-logo img {
          height: 50px;
          margin-right: 20px;
        }
        .order-details {
          margin-top: 20px;
        }
        .order-details th, .order-details td {
          padding: 8px 12px;
          border: 1px solid #ddd;
          text-align: center;
          font-weight: 400;
        }
        .order-details th {
          background-color: #f5f5f5;
        }
        .footer {
          text-align: center;
          margin-top: 20px;
          padding-top: 10px;
          border-top: 1px solid #ddd;
          font-size: 0.9em;
          color: #666;
        }
        @media screen and (max-width: 600px) {
          .email-container {
            width: 100% !important;
            padding: 10px !important;
          }
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header-logo">
          <img src="https://elbacatalini.com/elbacatalini-main-logo.png" alt="Logo de la empresa" />
        </div>
        <div class="header">
          <h2>Gracias por elegirnos!</h2>
          <p>Tu pedido ha sido recibido y está siendo procesado.</p>
          <p>Nuestro equipo de compras se pondrá en contacto con usted para enviarle el presupuesto , y luego coordinar el pago.</p>
        </div>
        <div class="order-details">
          <h3>Detalles del Pedido</h3>
          <table width="100%">
            <thead>
              <tr>
                <th style="padding: 8px 12px; border: 1px solid #ddd; background-color: #f5f5f5;">Producto</th>
                <th style="padding: 8px 12px; border: 1px solid #ddd; background-color: #f5f5f5;">Unidad</th>
                <th style="padding: 8px 12px; border: 1px solid #ddd; background-color: #f5f5f5;">Cantidad</th>
              </tr>
            </thead>
            <tbody>
              ${orderItemsHtml}
            </tbody>
          </table>
        </div>
        <div class="footer">
          <p>Si tenes alguna pregunta, contacta con nuestro servicio de atención al cliente.</p>
          <p>&copy; ${new Date().getFullYear()} Elba Catalini. Todos los derechos reservados.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const transporter = createTransporter();

  try {
    // Enviar el correo
    await transporter.sendMail({
      from: `Elba Susana Catalini <${process.env.EMAIL_USER}>`,
      to: customerEmail,
      subject: `Confirmación de tu pedido, orden n°: ${orderId}`,
      html: emailHtml,
    });
  } catch (error) {
    throw error;
  }
}

export default sendClientOrderEmail;
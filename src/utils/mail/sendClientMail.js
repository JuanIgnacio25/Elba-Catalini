import createTransporter from "@/libs/nodemailer";

async function sendOrderEmail(customerEmail,orderItems) {

  // Formatear los elementos del pedido en HTML
  const orderItemsHtml = orderItems
    .map(
      (item) => `
        <tr>
            <td>${item.name}</td>
            <td>${item.category}</td>
            <td>${item.description}</td>
            <td>${item.unit}</td>
        </tr>
    `
    )
    .join("");

  const emailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                .email-container { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; }
                .header { text-align: center; border-bottom: 1px solid #ddd; padding-bottom: 10px; }
                .order-details { margin-top: 20px; }
                .order-details th, .order-details td { padding: 8px 12px; border: 1px solid #ddd; }
                .order-details th { background-color: #f5f5f5; }
                .footer { text-align: center; margin-top: 20px; padding-top: 10px; border-top: 1px solid #ddd; font-size: 0.9em; color: #666; }
            </style>
        </head>
        <body>
            <div class="email-container">
                <div class="header">
                    <h2>Gracias por tu compra!</h2>
                    <p>Tu pedido ha sido recibido y está siendo procesado.</p>
                </div>
                <div class="order-details">
                    <h3>Detalles del Pedido</h3>
                    <table width="100%">
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Categoría</th>
                                <th>Descripción</th>
                                <th>Unidad</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${orderItemsHtml}
                        </tbody>
                    </table>
                </div>
                <div class="footer">
                    <p>Si tienes alguna pregunta, responde a este correo o contacta con nuestro servicio de atención al cliente.</p>
                    <p>&copy; ${new Date().getFullYear()} Tu Empresa. Todos los derechos reservados.</p>
                </div>
            </div>
        </body>
        </html>
    `;

  const transporter = createTransporter();

  try {
    // Enviar el correo
    await transporter.sendMail({
      from: `LaCasaDelAccesorio <${process.env.EMAIL_USER}>`,
      to: customerEmail,
      subject: "Confirmación de tu pedido",
      html: emailHtml,
    });
  } catch (error) {
    throw error;
    console.error("Error al enviar el correo:", error);
    // Opcional: Puedes manejar el error según sea necesario, por ejemplo, enviar una notificación al administrador
  }
}

export default sendOrderEmail;
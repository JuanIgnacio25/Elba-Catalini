import createTransporter from "@/libs/nodemailer";
import ExcelJS from "exceljs";
import path from "path";

const evaluateBracketsInProduct = (productSku) => {
  const parts = productSku.split(".");

  const last = parts.at(-1);
  const secondLast = parts.at(-2);
  const thirdLast = parts.at(-3);

  const noReturnValues = new Set([
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "01",
    "02",
    "03",
    "300E",
    "1010E",
  ]);

  const lastReturnValues = new Set(["SF", "AD", "DF", "I", "PLUG", "SD"]);

  const colors = new Set([
    "A",
    "C",
    "R",
    "V",
    "AZ",
    "AB",
    "RB",
    "FRIO",
    "BA",
    "AU",
    "CU",
    "RB",
    "VU",
    "AZU",
    "RUF",
    "AA",
    "AAAA",
    "RA",
    "RR",
    "RC",
    "OP",
    "CC",
  ]);

  if (parts.length > 1) {
    if (noReturnValues.has(last)) return "";
    if (lastReturnValues.has(last)) {
      if (colors.has(secondLast)) return secondLast;
      if (secondLast === "I") return thirdLast;
    }
    if (colors.has(last)) return last;
  }

  return "";
};

const generateExcelBuffer = async (clientData, products, order) => {
  try {
    // Ruta al archivo Excel dentro de la carpeta 'public'
    const filePath = path.join(
      process.cwd(),
      "public",
      "excel",
      "FormularioDePedidos.xlsx"
    );

    // Cargar el archivo de la plantilla de Excel
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);

    // Obtener la hoja de cálculo
    const worksheet = workbook.getWorksheet("hoja0");
    if (!worksheet) {
      throw new Error("La hoja 'hoja0' no existe en el archivo de plantilla.");
    }

    // Estilos de borde
    const borderStyle = {
      right: { style: "thin", color: { argb: "FF000000" } },
      bottom: { style: "thin", color: { argb: "FF000000" } },
      left: { style: "thin", color: { argb: "FF000000" } },
    };

    // Aplicar valores, bordes y tamaño de fuente a las celdas (companyName, location, carrier)

    worksheet.getCell("A5").border = { ...borderStyle };

    worksheet.getCell("B1").value = clientData.companyName;
    worksheet.getCell("B1").font = { size: 16 };

    worksheet.getCell("B2").value = clientData.location;
    worksheet.getCell("B2").font = { size: 16 };

    worksheet.getCell("B3").value = clientData.carrier;
    worksheet.getCell("B3").font = { size: 16 };

    worksheet.getCell("C2").alignment = { vertical: "top", horizontal: "left" };
    worksheet.getCell("C3").alignment = { vertical: "top", horizontal: "left" };

    worksheet.getCell("C4").value = `Fecha: ${new Date(
      order.createdAt
    ).toLocaleString("es-AR", {
      timeZone: "America/Argentina/Buenos_Aires",
      dateStyle: "short",
    })}`;

    // Insertar productos dinámicamente comenzando en la fila 6
    let startRow = 6;

    products.forEach((item, index) => {
      const currentRow = startRow + index;

      // Insertar una nueva fila para cada producto
      worksheet.insertRow(currentRow);

      worksheet.getRow(currentRow).height = 35;

      // Asignar valores a las celdas, aplicar bordes y ajustar estilo (centrado y tamaño de fuente)
      worksheet.getCell(`A${currentRow}`).value =
        item.productSet !== 0 && item.kind == "Baiml"
          ? item.productSet
          : item.unit * item.quantity;
      worksheet.getCell(`A${currentRow}`).border = { ...borderStyle };
      worksheet.getCell(`A${currentRow}`).font = { size: 18 };
      worksheet.getCell(`A${currentRow}`).alignment = {
        vertical: "middle",
        horizontal: "center",
      };

      worksheet.getCell(`B${currentRow}`).value = item.nameForOrders;
      worksheet.getCell(`B${currentRow}`).border = { ...borderStyle };
      worksheet.getCell(`B${currentRow}`).font = { size: 19 };
      worksheet.getCell(`B${currentRow}`).alignment = {
        vertical: "middle",
        horizontal: "left",
      };

      worksheet.getCell(`C${currentRow}`).value = `(${item.quantity}${
        item.kind == "Baiml" ? evaluateBracketsInProduct(item.sku) : ""
      })`;
      worksheet.getCell(`C${currentRow}`).border = { ...borderStyle };
      worksheet.getCell(`C${currentRow}`).font = { size: 18 };
      worksheet.getCell(`C${currentRow}`).alignment = {
        vertical: "middle",
        horizontal: "center",
      };
    });

    // Rellenar con filas vacías si hay menos de 10 productos
    const totalRows = 15;
    let filledRows = products.length;

    if (filledRows < totalRows) {
      for (let i = filledRows; i < totalRows; i++) {
        const currentRow = startRow + i;

        // Insertar una fila vacía
        worksheet.insertRow(currentRow);

        worksheet.getRow(currentRow).height = 40;

        // Aplicar bordes y estilo a las celdas vacías
        worksheet.getCell(`A${currentRow}`).value = null;
        worksheet.getCell(`A${currentRow}`).border = { ...borderStyle };
        worksheet.getCell(`A${currentRow}`).font = { size: 20 };
        worksheet.getCell(`A${currentRow}`).alignment = {
          vertical: "middle",
          horizontal: "center",
        };

        worksheet.getCell(`B${currentRow}`).value = null;
        worksheet.getCell(`B${currentRow}`).border = { ...borderStyle };
        worksheet.getCell(`B${currentRow}`).font = { size: 20 };
        worksheet.getCell(`B${currentRow}`).alignment = {
          vertical: "middle",
          horizontal: "center",
        };

        worksheet.getCell(`C${currentRow}`).value = null;
        worksheet.getCell(`C${currentRow}`).border = { ...borderStyle };
        worksheet.getCell(`C${currentRow}`).font = { size: 20 };
        worksheet.getCell(`C${currentRow}`).alignment = {
          vertical: "middle",
          horizontal: "center",
        };
      }
    }

    // Mover la fila con "Armador, Controlo, Fecha" a la última fila disponible
    const rowAfterProducts = startRow + totalRows;
    worksheet.spliceRows(rowAfterProducts, 1); // Mueve la fila existente hacia abajo en lugar de crear una nueva

    // Definir el ancho de las columnas
    worksheet.getColumn(1).width = 15; // Ancho para columna A
    worksheet.getColumn(2).width = 75; // Ancho para columna B
    worksheet.getColumn(3).width = 20; // Ancho para columna C

    // Establecer altura para todas las filas
    worksheet.getRow(1).height = 32;
    worksheet.getRow(2).height = 32;
    worksheet.getRow(3).height = 32;
    worksheet.getRow(4).height = 32;
    worksheet.getRow(5).height = 32;

    worksheet.getRow(5).font = { size: 18 };

    // Escribir el buffer
    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
  } catch (error) {
    throw error;
  }
};

const sendEmailWithAttachment = async (clientData, attachmentBuffer) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.RECIEVER_EMAIL_USER,
    subject: `Pedido de Cotización de ${clientData.companyName}`,
    html: `
         <html>
            <head>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  padding: 20px;
                  margin: 0;
                }

                .email-container {
                  background-color: #f9f9f9;
                  border-radius: 8px;
                  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
                  max-width: 900px;
                  width: 100%;
                  padding: 20px;
                  margin: 0 auto;
                }

                .email-container h1 {
                  font-size: 22px;
                  color: #333;
                  border-bottom: 2px solid #d43f3a;
                  padding-bottom: 8px;
                  margin-bottom: 15px;
                  text-align: center;
                }

                .email-container p {
                  font-size: 16px;
                  color: #333;
                  margin: 5px 0;
                }

                .comments {
                  font-size: 16px;
                  font-weight: bold;
                  color: #d9534f;
                  background-color: #f2dede;
                  padding: 12px;
                  border-radius: 8px;
                  display: block;
                  border-left: 6px solid #d43f3a;
                  margin-top: 10px;
                }

                .no-comments {
                  font-size: 16px;
                  font-weight: bold;
                  color: #555;
                  background-color: #e7e7e7;
                  padding: 12px;
                  border-radius: 8px;
                  display: block;
                  border-left: 6px solid #999;
                  margin-top: 10px;
                }

                /* Media Queries for Responsiveness */
                @media (max-width: 768px) {
                  .email-container {
                    padding: 15px;
                  }

                  .email-container h1 {
                    font-size: 20px;
                  }

                  .email-container p {
                    font-size: 14px;
                  }

                  .comments,
                  .no-comments {
                    font-size: 14px;
                    padding: 10px;
                  }
                }

                @media (max-width: 480px) {
                  .email-container {
                    padding: 10px;
                  }

                  .email-container h1 {
                    font-size: 18px;
                  }

                  .email-container p {
                    font-size: 13px;
                  }

                  .comments,
                  .no-comments {
                    font-size: 13px;
                    padding: 8px;
                  }
                }
              </style>
            </head>
            <body>
              <table class="email-container" cellspacing="0" cellpadding="10" align="center">
                <tr>
                  <td>
                    <h1>Información del Usuario</h1>
                    <p><strong>Email:</strong> ${clientData.email}</p>
                    <p><strong>Número de Contacto:</strong> ${
                      clientData.phoneNumber
                    }</p>
                    <p><strong>Dirección:</strong> ${clientData.address}</p>
                    <p><strong>CUIT:</strong> ${clientData.cuit}</p>
                    <p><strong>Nombre del Encargado de Compra:</strong> ${
                      clientData.purchasingManagerName
                    }</p>

                    ${
                      clientData.comments !== ""
                        ? `<p class="comments"><span>Comentarios:</span> ${clientData.comments}</p>`
                        : `<p class="no-comments">Sin Comentarios</p>`
                    }
                  </td>
                </tr>
              </table>
            </body>
          </html>
    `,
    attachments: [
      {
        filename: `${clientData.companyName}.xlsx`,
        content: attachmentBuffer,
        contentType:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error("Failed to send email");
  }
};

const createAndSendExcelEmail = async (clientData, products, order) => {
  try {
    const attachmentBuffer = await generateExcelBuffer(
      clientData,
      products,
      order
    );
    await sendEmailWithAttachment(clientData, attachmentBuffer);
  } catch (error) {
    throw error;
  }
};

export default createAndSendExcelEmail;

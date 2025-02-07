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

      worksheet.getRow(currentRow).height = 40;

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
        horizontal: "center",
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
    const totalRows = 10;
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
    worksheet.getColumn(2).width = 65; // Ancho para columna B
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

const sendEmailWithAttachment = async (
  clientName,
  attachmentBuffer,
  comments
) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: `Pedido de presupuesto de ${clientName}`,
    text: `Excel del pedido adjuntado , ${
      comments !== "" ? `Comentarios: ${comments}` : ""
    }`,
    attachments: [
      {
        filename: `${clientName}.xlsx`,
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
    await sendEmailWithAttachment(
      clientData.companyName,
      attachmentBuffer,
      clientData.comments
    );
  } catch (error) {
    throw error;
  }
};

export default createAndSendExcelEmail;

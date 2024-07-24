import createTransporter from "@/libs/nodemailer";
import * as XLSX from "xlsx"


  const generateExcelBuffer = (products) => {
    try {
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(products);
  
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
      const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
      return buffer;
    } catch (error) {
      console.error('Error generating Excel file:', error);
      throw new Error('Failed to generate Excel file');
    }
  };
  
  const sendEmailWithAttachment = async (clientName , attachmentBuffer) => {
    const transporter = createTransporter();
  
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `Pedido de presupuesto de ${clientName}`,
      text: `Excel del pedido adjuntado`,
      attachments: [
        {
          filename: 'attachment.xlsx',
          content: attachmentBuffer,
          contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        },
      ],
    };
  
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.response);
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }
  };
  
  const createAndSendExcelEmail = async (clientName, data) => {
    try {
      const attachmentBuffer = generateExcelBuffer(data);
      await sendEmailWithAttachment(clientName, attachmentBuffer);
    } catch (error) {
      console.error('Error creating and sending Excel email:', error);
    }
  };

export default createAndSendExcelEmail;
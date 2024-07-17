import OrderDao from "@/models/order/OrderDao";
import createAndSendExcelEmail from "@/utils/sendOfficeMail";
import sendOrderEmail from "@/utils/sendClientMail";

class OrdeService {
  constructor() {
    this.dao = new OrderDao();
  }

  async closeOrder(products, user) {
    try {
      const createdOrder = await this.dao.createOrder(products);

      sendOrderEmail(user.email,products);

      createAndSendExcelEmail(user.fullname, products);
      
      return createdOrder;
    } catch (error) {
      throw error;
    }
  }
}

export default OrdeService;

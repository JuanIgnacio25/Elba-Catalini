import OrderDao from "@/models/order/OrderDao";
import createAndSendExcelEmail from "@/utils/sendOfficeMail";
import sendOrderEmail from "@/utils/sendClientMail";

class OrderService {
  constructor() {
    this.dao = new OrderDao();
  }

  async closeOrder(products, user) {
    try {
      const order = {userId:user.id,products};
      
      const createdOrder = await this.dao.createOrder(order);

      sendOrderEmail(user.email, products);

      createAndSendExcelEmail(user.fullname, products);

      return createdOrder;
    } catch (error) {
      throw error;
    }
  }

  async findOrderByUserId(id) {
    try {
      console.log(typeof id);
    } catch (error) {
      throw error;
    }
  }
}

export default OrderService;

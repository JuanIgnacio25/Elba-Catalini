import OrderDao from "@/models/order/OrderDao";
import createAndSendExcelEmail from "@/utils/mail/sendOfficeMail";
import sendClientOrderEmail from "@/utils/mail/sendClientOrderMail";

class OrderService {
  constructor() {
    this.dao = new OrderDao();
  }

  async closeOrder(products, user) {
    try {
      
      const order = { userId: user.id, products };

      const createdOrder = await this.dao.createOrder(order);
      
      sendClientOrderEmail(user.email, products,createdOrder.orderId);

      await createAndSendExcelEmail(user, products , createdOrder);
      
      return createdOrder;
    } catch (error) {
      throw error;
    }
  }

  async findOrdersByUserId(id) {
    try {
      const orders = this.dao.findOrdersByUserId(id);
      return orders;
    } catch (error) {
      throw error;
    }
  }

//busca las ordenes con el mismo userId y despues filtra por el orderId y devuelve esa orden
  async findOrdersByUserIdAndOrderId(userId, orderId) {
    try {
      const orders = await this.findOrdersByUserId(userId);
      const filteredOrder = orders.find((e) => e.orderId == orderId);
      return filteredOrder;
    } catch (error) {
      throw error;
    }
  }
}

export default OrderService;

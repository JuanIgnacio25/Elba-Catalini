import OrderDao from "@/models/order/OrderDao"

class OrdeService {
  constructor() {
   this.dao = new OrderDao();
  }

  async closeOrder(products) {
    try {
      const createdOrder = await this.dao.createOrder(products);
      return createdOrder;
    } catch (error) {
      throw error;
    }
  }
}

export default OrdeService;

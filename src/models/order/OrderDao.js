import Order from "@/models/order/order";

class OrderDao {
  constructor() {
    this.collection = Order;
  }

  async createOrder(products) {
    try {
      const createdOrder = await this.collection.create({products});
      return createdOrder;
    } catch (error) {
      throw error;
    }
  }
}

export default OrderDao;

import Order from "@/models/order/order";

class OrderDao {
  constructor() {
    this.collection = Order;
  }

  async createOrder(order) {
    try {
      const createdOrder = await this.collection.create(order);
      return createdOrder;
    } catch (error) {
      throw error;
    }
  }
}

export default OrderDao;

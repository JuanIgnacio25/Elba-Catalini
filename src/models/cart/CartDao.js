import Cart from "@/models/cart/cart";

class CartDao {
  constructor() {
    this.collection = Cart;
  }

  async createCart() {
    try {
      const createdCart = await this.collection.create({});
      return createdCart;
    } catch (error) {
      throw error;
    }
  }
}

export default CartDao;

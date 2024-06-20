import CartDao from "./CartDao";

class CartService {
  constructor() {
    this.dao = new CartDao();
  }

  async createUser() {
    try {
      const createdCart = this.dao.createCart();
      return createdCart;
    } catch (error) {
      throw error;
    }
  }
}

export default CartService;

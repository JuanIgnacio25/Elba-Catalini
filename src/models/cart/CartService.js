import CartDao from "./CartDao";

class CartService {
  constructor() {
    this.dao = new CartDao();
  }

  async createCart() {
    try {
      const createdCart = this.dao.createCart();
      return createdCart;
    } catch (error) {
      throw error;
    }
  }

  async getCartById(id){
    try {
      const cart = await this.dao.getCartById(id);
      return cart;
    } catch (error) {
      throw error;
    }
  }

  async addProductToCart(cartId,product){
    try {
      const cart = await this.getCartById(cartId);
      if(!cart) throw new Error("El carrito no existe");

      const addedProduct = await this.dao.addProductToCart(cartId,product);
      return addedProduct;
    } catch (error) {
      throw error;
    }
  }
}

export default CartService;

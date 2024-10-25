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
      const cart = await this.dao.getCartById(Number(id));
      return cart;
    } catch (error) {
      throw error;
    }
  }

  getProductFromCartById(cart,productId) {
    try {
      const product = cart.products.filter((e) => e.productId == productId);
      return product;
    } catch (error) {
      throw error;
    }
  }

  async addProductToCart(cartId,prod){
    try {

      const cart = await this.getCartById(cartId);
      if(!cart) throw new Error("El carrito no existe");

      const existingProduct = this.getProductFromCartById(cart,prod.productId);

      if(existingProduct.length !== 0) {
        
        const newQuantity = Number(existingProduct[0].quantity) + Number(prod.quantity);
        const updatedProduct = await this.dao.changeProductQuantityFromCart(cartId,prod.productId,newQuantity);
        return updatedProduct;
      }
      const addedProduct = await this.dao.addProductToCart(cartId,prod);
      return addedProduct;
    } catch (error) {
      throw error;
    }
  }

  async addProductsArrayToCart(cartId,products){
    try {
      const addedProducts = this.dao.addProductsArrayToCart(cartId,products);
      return addedProducts;
    } catch (error) {
      throw error;
    }
  }

  async removeProductFromCart(cartId,productId){
    try {
      const cart = await this.getCartById(cartId);
      const isInTheCart = this.getProductFromCartById(cart,productId);
      if(isInTheCart.length == 0) throw new Error("El producto no se encontraba en el carrito");
      await this.dao.removeProductFromCart(cartId,Number(productId));
    } catch (error) {
      throw error;
    }
  }

  async clearCart(id){
    try {
      const clearedCart = await this.dao.clearCart(id);
      return clearedCart;
    } catch (error) {
      throw error;
    }
  }
}

export default CartService;

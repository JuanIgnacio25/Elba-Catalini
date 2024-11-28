import CartDao from "./CartDao";
import toNumericId from "@/utils/toNumericId";

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

  async getCartById(cartId){
    try {
      toNumericId(cartId)
      const cart = await this.dao.getCartById(cartId);
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
        await this.dao.changeProductQuantityFromCart(cartId,prod.productId,newQuantity);

        return {name:prod.name, quantity:prod.quantity};
      }

      const updatedCart= await this.dao.addProductToCart(cartId,prod);
      const {name , quantity} = updatedCart.products[updatedCart.products.length - 1];

      return {name , quantity};

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

  async clearCart(cartId){
    try {
      toNumericId(cartId)
      const clearedCart = await this.dao.clearCart(cartId);
      return clearedCart;
    } catch (error) {
      throw error;
    }
  }

  async removeProductFromAllCarts(productId) {
    try {
      toNumericId(productId)
      const clearedCart = await this.dao.removeProductFromAllCarts(productId);
      return clearedCart.modifiedCount;
    } catch (error) {
      throw error;
    }
  }
}

export default CartService;

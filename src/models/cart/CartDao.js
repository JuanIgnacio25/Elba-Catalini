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

  async getCartById(cartId) {
    try {
      const cart = await this.collection.findOne({ cartId });
      return cart;
    } catch (error) {
      throw error;
    }
  }


  async addProductToCart(cartId, product) {
    try {
      
      const addedProduct = this.collection.findOneAndUpdate(
        { cartId : cartId},
        { $push: { products: product } },
        { new: true, useFindAndModify: false }
      );

      return addedProduct;
    } catch (error) {
      throw error;
    }
  }

  async removeProductFromCart(cartId, productId) {
    try {
  
      const result = await this.collection.updateOne(
        { cartId : cartId },
        { $pull: { products: { productId: productId } } }
      );

    } catch (error) {
      throw error;
    }
  }
}

export default CartDao;

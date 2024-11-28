import Cart from "@/models/cart/cart";

class CartDao {
  constructor() {
    this.collection = Cart;
  }

  /* Crea un carrito vacio */
  async createCart() {
    try {
      const createdCart = await this.collection.create({});
      return createdCart;
    } catch (error) {
      throw error;
    }
  }

  /* Obtiene un carrito por cartId */
  async getCartById(cartId) {
    try {
      const cart = await this.collection.findOne({ cartId });
      return cart;
    } catch (error) {
      throw error;
    }
  }

  /* Busca el carrito por cartId y luego añade el producto que se le pasa */
  async addProductToCart(cartId, product) {
    try {
      const cartUpdated = this.collection.findOneAndUpdate(
        { cartId: cartId },
        { $push: { products: product } },
        { new: true, useFindAndModify: false }
      );

      return cartUpdated;
    } catch (error) {
      throw error;
    }
  }


  async changeProductQuantityFromCart(cartId, productId, quantity) {
    try {
      const addedProduct = this.collection.findOneAndUpdate(
        { cartId: cartId, "products.productId": productId },
        { $set: { "products.$.quantity": quantity } },
        { new: true }
      );
      return addedProduct;
    } catch (error) {
      throw error;
    }
  }

  async addProductsArrayToCart(cartId, products) {
    try {
      return Cart.updateOne(
        { cartId: cartId },
        { $push: { products: { $each: products } } }
      );
    } catch (error) {
      throw error;
    }
  }

  /* Busca el carrito por cartId y elimina el producto por productId */
  async removeProductFromCart(cartId, productId) {
    try {
      const result = await this.collection.updateOne(
        { cartId: cartId },
        { $pull: { products: { productId: productId } } }
      );
    } catch (error) {
      throw error;
    }
  }

  /* Vacia el array de productos del carrito , lo setea a [] */
  async clearCart(cartId) {
    try {
      const clearedCart = await this.collection.findOneAndUpdate(
        { cartId: cartId },
        { $set: { products: [] } },
        { new: true }
      );
      return clearedCart;
    } catch (error) {
      throw error;
    }
  }

  /* Elimina un producto por productId de todos los carritos */
  async removeProductFromAllCarts(productId) {
    try {
      const result = await this.collection.updateMany(
        { "products.productId": productId },
        { $pull: { products: { productId: productId } } }
      );

      return result;
    } catch (error) {
      throw error;
    }
  }
 
}

export default CartDao;

import CartDao from "./CartDao";
import toNumericId from "@/utils/toNumericId";
import validateQuantity from "@/utils/validate/validateQuantity";

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

  async getCartById(cartId) {
    try {
      const cart = await this.dao.getCartById(toNumericId(cartId));
      return cart;
    } catch (error) {
      throw error;
    }
  }

  getProductFromCartById(cart, productId) {
    try {
      const product = cart.products.filter((e) => e.productId == productId);
      return product;
    } catch (error) {
      throw error;
    }
  }

  async addProductToCart(cartId, prod) {
    try {
      const cart = await this.getCartById(cartId);
      if (!cart) throw new Error("El carrito no existe");

      const existingProduct = this.getProductFromCartById(cart, prod.productId);

      if (existingProduct.length !== 0) {
        const newQuantity =
          Number(existingProduct[0].quantity) + Number(prod.quantity);
        await this.dao.changeProductQuantityFromCart(
          cartId,
          prod.productId,
          newQuantity
        );

        return { name: prod.name, quantity: prod.quantity };
      }

      const updatedCart = await this.dao.addProductToCart(cartId, prod);
      const { name, quantity } =
        updatedCart.products[updatedCart.products.length - 1];

      return { name, quantity };
    } catch (error) {
      throw error;
    }
  }

  async addProductsArrayToCart(cartId, products) {
    try {
      const addedProducts = this.dao.addProductsArrayToCart(
        toNumericId(cartId),
        products
      );
      return addedProducts;
    } catch (error) {
      throw error;
    }
  }

  async removeProductFromCart(cartId, productId) {
    try {
      const cart = await this.getCartById(cartId);
      const isInTheCart = this.getProductFromCartById(cart, productId);
      if (isInTheCart.length == 0)
        throw new Error("El producto no se encontraba en el carrito");
      await this.dao.removeProductFromCart(cartId, Number(productId));
    } catch (error) {
      throw error;
    }
  }

  async clearCart(cartId) {
    try {
      const clearedCart = await this.dao.clearCart(toNumericId(cartId));
      return clearedCart;
    } catch (error) {
      throw error;
    }
  }

  async removeProductFromAllCarts(productId) {
    try {
      const clearedCart = await this.dao.removeProductFromAllCarts(
        toNumericId(productId)
      );
      return clearedCart.modifiedCount;
    } catch (error) {
      throw error;
    }
  }

  async validateProductsQuantity(products) {
    try {
      const validatedProducts = products.map((prod) => {
        if (!validateQuantity(prod.quantity)) {
          return { productId: prod.productId, quantity: 1 };
        }
        return { productId: prod.productId, quantity: prod.quantity };
      });

      return validatedProducts;
    } catch (error) {
      throw error;
    }
  }

  async validateLocalProductsById(localProducts, allProducts) {
    try {
      const plainProducts = allProducts.map((product) => product.toObject());

      const validatedProductsById = localProducts.map((prod) => {
        const product = plainProducts.find(
          (e) => e.productId === prod.productId
        );
        if (!product) return;
        return { ...product, quantity: prod.quantity };
      });

      return validatedProductsById.filter((prod) => prod !== undefined);
    } catch (error) {
      throw error;
    }
  }

  async mergeProductsArray(localProducts, dbProducts, cartId) {
    try {
      const mergedCart = [...dbProducts];

      localProducts.forEach((localProd) => {
        const existingProduct = mergedCart.find(
          (prod) => prod.productId === localProd.productId
        );

        if (existingProduct) {
          existingProduct.quantity = Number(existingProduct.quantity) + Number(localProd.quantity);
        } else {
          mergedCart.push(localProd);
        }
      });

      await this.dao.replaceProductsArray(cartId, mergedCart);

      return mergedCart;
    } catch (error) {
      console.log(error);
    }
  }

  async mergeCarts(localProductsCart, cart, allProducts) {
    try {
      if (!cart) throw new Error("El carrito no existe");

      if (localProductsCart.length === 0) return cart;

      const validatedQuantityProducts = await this.validateProductsQuantity(
        localProductsCart
      );

      const validatedProducts = await this.validateLocalProductsById(
        validatedQuantityProducts,
        allProducts
      );

      const mergedCart = await this.mergeProductsArray(
        validatedProducts,
        cart.products,
        cart.cartId
      );

      return mergedCart;
    } catch (error) {
      throw error;
    }
  }
}

export default CartService;

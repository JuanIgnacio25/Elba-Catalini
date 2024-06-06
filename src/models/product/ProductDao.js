import { Product, Baiml } from "@/models/product/product";

class ProductDao {
  constructor() {
    this.collection = Product;
    this.discriminators = {
      Baiml,
    };
  }

  async createProduct(product) {
    try {
      const { kind, ...productData } = product;

      let createdProduct;
      if (kind && this.discriminators[kind]) {
        createdProduct = await this.discriminators[kind].create(productData);
      } else {
        createdProduct = await this.collection.create(productData);
      }

      return createdProduct;
    } catch (error) {
      throw error;
    }
  }

  async getAllProducts() {
    try {
      const products = await this.collection.find();
      return products;
    } catch (error) {
      throw error;
    }
  }

  async findProductById(productId) {
    try {
      const product = await this.collection.findOne({productId});
      return product;
    } catch (error) {
      throw error;
    }
  }

  async deleteProduct(productId) {
    try {
      const deleteProduct = await this.collection.findOneAndDelete({productId});
      if (!deleteProduct) {
        throw new Error("El producto no existe");
      }
      return deleteProduct;
    } catch (error) {
      throw error;
    }
  }
}

export default ProductDao;

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
      console.log(product);

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
}

export default ProductDao;

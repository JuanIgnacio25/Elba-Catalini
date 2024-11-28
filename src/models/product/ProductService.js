import ProductDao from "@/models/product/ProductDao";
import { isValidBaimlProduct } from "@/utils/validate/validateBaimlProducts";
import toNumericId from "@/utils/toNumericId";

class ProductService {
  constructor() {
    this.dao = new ProductDao();
  }

  async getAllProducts() {
    try {
      const products = await this.dao.getAllProducts();
      return products;
    } catch (error) {
      throw error;
    }
  }

  async getProducts(filter = {}) {
    try {
      const products = await this.dao.getProducts(filter);
      return products;
    } catch (error) {
      throw error
    }
  }

  async findProductById(productId) {
    try {
      const product = await this.dao.findProductById(toNumericId(productId));
      return product;
    } catch (error) {
      throw error;
    }
  }

  async createProduct(product) {
    try {
      const newProduct = await this.dao.createProduct(product);
      return newProduct;
    } catch (error) {
      throw error;
    }
  }

  async deleteProduct(productId) {
    try {  
      const deleteProduct = await this.dao.deleteProduct(toNumericId(productId));
      return deleteProduct;
    } catch (error) {
      throw error;
    }
  }

  async updateProduct(productToUpdate,id) {
    try {
      console.log(productToUpdate);
      isValidBaimlProduct(productToUpdate);
      productToUpdate.kind = "Baiml";
      const updateProduct = await this.dao.updateProduct(productToUpdate,id);
      return updateProduct;
    } catch (error) {
      throw error;
    }
  }
}

export default ProductService;

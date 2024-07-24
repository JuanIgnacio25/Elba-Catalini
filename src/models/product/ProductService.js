import ProductDao from "@/models/product/ProductDao";
import { isValidBaimlProduct } from "@/utils/validate/validateBaimlProducts";

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

  async findProductById(id) {
    try {
      const product = await this.dao.findProductById(id);
      return product;
    } catch (error) {
      throw error;
    }
  }

  async createProduct(product) {
    try {
      isValidBaimlProduct(product);
      product.kind = "Baiml";
      const newProduct = await this.dao.createProduct(product);
      return newProduct;
    } catch (error) {
      throw error;
    }
  }

  async deleteProduct(id) {
    try {
      const deleteProduct = await this.dao.deleteProduct(id);
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

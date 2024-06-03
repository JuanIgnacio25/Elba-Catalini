import ProductDao from "@/models/product/ProductDao";

class ProductService{
  constructor(){
    this.dao = new ProductDao();
  }

  async getAllProducts(){
    try {
      const products = await this.dao.getAllProducts();
      return products;
    } catch (error) {
      throw error;
    }
  }

  async createProduct(product){
    try {
      const newProduct = await this.dao.createProduct(product);
      return newProduct;
    } catch (error) {
      throw error;
    }
  }
}

export default ProductService;
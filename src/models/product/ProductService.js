import ProductDao from "@/models/product/ProductDao";
import { isValidBaimlProduct } from "@/utils/validate/validateBaimlProducts";
import { isValidStoreProduct } from "@/utils/validate/validateStoreProduct";
import { isValidProductInfo } from "@/utils/validate/validateProductCategoryInfo";
import toNumericId from "@/utils/toNumericId";
import { deleteImageFromCloudinary } from "@/utils/imageHandler/cloudinaryImagesHandler";

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
      throw error;
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
      const product = await this.dao.findProductById(toNumericId(productId));
      if (!product) throw new Error("El producto no existe");

      //elimina todas las imagenes del producto de cloudinary solo cuando otro producto no este usando la misma imagen
      //El false al final es para que no actualice la propiedad images del producto con la imagen eliminada , porque se eliminara el producto completo luego
      for (const image of product.images) {
        await this.deleteProductImage(productId, image.public_id, false);
      }

      const deletedProduct = await this.dao.deleteProduct(
        toNumericId(productId)
      );

      return deletedProduct;
    } catch (error) {
      throw error;
    }
  }

  async checkIfProductImageIsShared(public_id) {
    // Contar cuántos productos aún usan esta imagen
    const count = await this.dao.countImages(public_id);
    console.log("count", count);

    return count;
  }

  async deleteProductImage(productId, public_id, updateProduct) {
    try {
      const count = await this.checkIfProductImageIsShared(public_id);

      if (count === 1) {
        await deleteImageFromCloudinary(public_id);
      }

      if (updateProduct) {
        return await this.dao.updateProductImage(productId, public_id);
      }
    } catch (error) {
      throw error;
    }
  }

  async updateProduct(productToUpdate, id) {
    try {
      if (productToUpdate.kind === "Store") {
        isValidStoreProduct(productToUpdate);
      } else if (productToUpdate.kind === "Baiml") {
        isValidBaimlProduct(productToUpdate);
      } else throw new Error("El tipo de producto no es valido");

      const updateProduct = await this.dao.updateProduct(productToUpdate, id);
      return updateProduct;
    } catch (error) {
      throw error;
    }
  }

  async checkProductsExist(productIds) {
    try {
      const count = await this.dao.checkProductsExist(productIds);

      return count === productIds.length;
    } catch (error) {
      throw error;
    }
  }

  async findProductsByCategory(kind, category) {
    try {
      isValidProductInfo({ kind, category });
      const filteredProducts = await this.dao.findProductByCategory(
        kind,
        category
      );
      return filteredProducts;
    } catch (error) {
      throw error;
    }
  }
}

export default ProductService;

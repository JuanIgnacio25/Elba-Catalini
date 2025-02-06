import { Product, Baiml, Store } from "@/models/product/product";

class ProductDao {
  constructor() {
    this.collection = Product;
    this.discriminators = {
      Baiml,
      Store,
    };
  }

  async createProduct(product) {
    try {
      const { kind, ...productData } = product;

      const createdProduct = await this.discriminators[kind].create(
        productData
      );

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

  async getProducts(filter) {
    try {
      const products = await this.collection.find({ kind: filter });
      return products;
    } catch (error) {
      throw error;
    }
  }

  async findProductById(productId) {
    try {
      const product = await this.collection.findOne({ productId });
      return product;
    } catch (error) {
      throw error;
    }
  }

  async findProductByCategory(kind, category) {
    try {
      let filteredProducts = [];

      if (kind === "Store") {
        filteredProducts = await this.collection.find({
          kind,
          subCategory: category,
        });
      } else if (kind === "Baiml") {
        filteredProducts = await this.collection.find({ kind, category });
      }

      return filteredProducts;
    } catch (error) {
      throw error;
    }
  }

  async deleteProduct(productId) {
    try {
      const deletedProduct = await this.collection.findOneAndDelete({
        productId,
      });
      if (!deletedProduct) {
        throw new Error("El producto no existe");
      }
      return deletedProduct;
    } catch (error) {
      throw error;
    }
  }

  async updateProduct(productToUpdate, productId) {
    const { kind, ...productData } = productToUpdate;

    try {
      const updatedProduct = await this.discriminators[kind].findOneAndUpdate(
        { productId },
        productData,
        { new: true, runValidators: true }
      );
      if (!updatedProduct) {
        throw new Error("El producto no existe");
      }
      return updatedProduct;
    } catch (error) {
      throw error;
    }
  }

  async checkProductsExist(productIds) {
    try {
      const count = await this.collection.countDocuments({
        productId: { $in: productIds },
      });

      return count;
    } catch (error) {
      throw error;
    }
  }

  async countImages(imagePublic_id) {
    try {
      const count = await this.collection.countDocuments({
        "images.public_id": imagePublic_id,
      });
      return count;
    } catch (error) {
      throw error;
    }
  }

  async deleteProductImage(productId, public_id) {
    try {
      const updatedProduct = await this.collection.findOneAndUpdate(
        { productId },
        { $pull: { images: { public_id } } },
        { new: true }
      );
      if (!updatedProduct) {
        throw new Error("El producto no existe");
      }
      return updatedProduct;
    } catch (error) {
      throw error;
    }
  }

  async updateProductImage(productId, newImage) {
    try {
      const updatedProduct = await this.collection.findOneAndUpdate(
        { productId },
        { $push: { images: newImage } },
        { new: true }
      );
      if (!updatedProduct) {
        throw new Error("El producto no existe");
      }
      return updatedProduct;
    } catch (error) {
      throw error;
    }
  }
}

export default ProductDao;

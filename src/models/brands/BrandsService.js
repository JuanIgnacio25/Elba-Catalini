import BrandsDao from "./BrandsDao";

import {
  deleteImageFromCloudinary,
  uploadImagesToCloudinary,
} from "@/utils/imageHandler/cloudinaryLayoutImagesHandler";

class BrandsService {
  constructor() {
    this.dao = new BrandsDao();
  }

  async createBrand(brand) {
    try {
      const newBrand = await this.dao.createBrand(brand);
      return newBrand;
    } catch (error) {
      throw error;
    }
  }

  async getAllBrands() {
    try {
      const brands = await this.dao.getAllBrands();
      return brands;
    } catch (error) {
      throw error;
    }
  }

  async getAllImageUrls() {
    try {
      const brands = await this.dao.getAllImageUrls();
      return brands;
    } catch (error) {
      throw error;
    }
  }

}

export default BrandsService;

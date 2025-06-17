import BrandsDao from "./BrandsDao";
import toNumericId from "@/utils/toNumericId";
import { deleteImageFromCloudinary } from "@/utils/imageHandler/cloudinaryLayoutImagesHandler";

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

  async deleteBrand(id) {
    try {
      const brandId = toNumericId(id);
      const brand = await this.dao.getBrandById(brandId);
      
      if(!brand) throw new Error('La marca no existe');

      await deleteImageFromCloudinary(brand.image.public_id);
      const deletedBrand = await this.dao.deleteBrand(brandId);
      
      return deletedBrand;
    } catch (error) {
      throw error;
    }
  }

}

export default BrandsService;

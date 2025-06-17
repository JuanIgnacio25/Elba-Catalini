import BrandsDao from "./BrandsDao";
import toNumericId from "@/utils/toNumericId";
import {
  uploadImageToCloudinary,
  deleteImageFromCloudinary,
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

  async deleteBrand(id) {
    try {
      const brandId = toNumericId(id);
      const brand = await this.dao.getBrandById(brandId);

      if (!brand) throw new Error("La marca no existe");

      await deleteImageFromCloudinary(brand.image.public_id);
      const deletedBrand = await this.dao.deleteBrand(brandId);

      return deletedBrand;
    } catch (error) {
      throw error;
    }
  }

  async updateBrand(id, dataToUpdate) {
    try {
      console.log(dataToUpdate);
      
      let brandToUpdate;
      const brandId = toNumericId(id);

      const brand = await this.dao.getBrandById(brandId);
      if (!brand) throw new Error("La Marca no existe");

      if (dataToUpdate.image) { 
        const { secure_url, public_id } = await this.handleUpdateBrandImage(
          dataToUpdate.image,
          brand.image.public_id
        );

        brandToUpdate = {
          ...dataToUpdate,
          image: { url: secure_url, public_id },
        };

      } else {
        brandToUpdate = dataToUpdate;
      }
      const updatedBrand = await this.dao.updateBrand(brandId, brandToUpdate);

      return updatedBrand;
    } catch (error) {
      throw error;
    }
  }

  async handleUpdateBrandImage(newImage, oldImagePublicId) {
    try {
      await deleteImageFromCloudinary(oldImagePublicId);
      return await uploadImageToCloudinary(newImage, "brands_preset");
    } catch (error) {
      throw error;
    }
  }
}

export default BrandsService;

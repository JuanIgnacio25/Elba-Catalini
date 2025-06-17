import Brands from "@/models/brands/brands";

class BrandsDao {
  constructor() {
    this.collection = Brands;
  }

  async createBrand(brand) {
    try {
      const createdBrand = await this.collection.create(brand);
      return createdBrand;
    } catch (error) {
      throw error;
    }
  }

  async getAllBrands() {
    try {
      const brands = await this.collection.find().lean();
      const cleaned = brands.map(({ _id, ...rest }) => rest);

      return cleaned;
    } catch (error) {
      throw error;
    }
  }

  async getBrandById(brandId) {
    try {
      const brand = await this.collection.findOne({
        brandId,
      });
      return brand;
    } catch (error) {
      throw error;
    }
  }

  async updateBrand(brandId, dataToUpdate) {
    try {
      const updatedBrand = this.collection.findOneAndUpdate(
        {
          brandId,
        },
        dataToUpdate,
        { new: true, runValidators: true }
      );

      if (!updatedBrand) throw new Error("La Marca no existe");

      return updatedBrand;
    } catch (error) {
      throw error;
    }
  }

  async deleteBrand(brandId) {
    try {
      const deletedBrand = await this.collection.findOneAndDelete({ brandId });

      if (!deletedBrand) throw new Error("La marca no existe");

      return deletedBrand;
    } catch (error) {
      throw error;
    }
  }
}

export default BrandsDao;

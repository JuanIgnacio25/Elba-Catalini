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
}

export default BrandsDao;

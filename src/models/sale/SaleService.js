import SaleDao from "./SaleDao";
import { deleteImageFromCloudinary } from "@/utils/imageHandler/cloudinaryLayoutImagesHandler";

class SaleService{
  constructor(){
    this.dao = new SaleDao();
  }

  async getSale(){
    try {
      return await this.dao.getSale();
    } catch (error) {
      throw error;
    }
  }

  async updateSale(sale){
    try {
      const oldSaleImage = await this.getSale();
      const newSaleImage = await this.dao.updateSale(sale);
      await deleteImageFromCloudinary(oldSaleImage.image.public_id)
      return newSaleImage;
    } catch (error) {
      throw error;
    }
  }

}

export default SaleService;
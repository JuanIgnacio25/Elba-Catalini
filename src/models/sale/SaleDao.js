import Sale from "./sale";

class SaleDao {
  constructor() {
    this.collection = Sale;
  }

  async getSale() {
    try {
      const imageSale = await this.collection.find().lean();
      const { _id, ...cleanedSale } = imageSale[0];
      
      return cleanedSale;
    } catch (error) {
      throw error;
    }
  }

  async updateSale(saleToUpdate) {
    try {
      return await this.collection.findOneAndUpdate(
        {},
        { $set: saleToUpdate },
        { returnDocument: "after" }
      );
    } catch (error) {
      throw error;
    }
  }
}

export default SaleDao;

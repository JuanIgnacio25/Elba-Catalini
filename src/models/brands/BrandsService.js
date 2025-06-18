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
      const allBrands = await this.dao.getAllBrands();
      const total = allBrands.length;

      // Si el orden es mayor al largo del array se pone el valor del largo del array
      const order = brand.order > total + 1 ? total + 1 : brand.order;
      const newBrandData = { ...brand, order };

      const newBrand = await this.dao.createBrand(newBrandData);

      const newBrandsOrder = await this.reorderBrands(newBrand.brandId , null , true);

      return newBrandsOrder;
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
      await this.dao.deleteBrand(brandId);

      return await this.reorderBrands();
    } catch (error) {
      throw error;
    }
  }

  async updateBrand(id, dataToUpdate) {
    try {
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

      return await this.reorderBrands(updatedBrand.brandId, brand.order , false);
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

  async reorderBrands(modifiedBrandId = null, previousOrder = null, isNew = false) {
    try {
      let allBrands = await this.dao.getAllBrands();
  
      const sortedBrands = [...allBrands].sort((a, b) => {
        if (a.order === b.order) {
          const aIsModified = a.brandId === modifiedBrandId;
          const bIsModified = b.brandId === modifiedBrandId;
  
          // Agregando nueva marca: que aparezca primero entre duplicados
          if (isNew) {
            if (aIsModified) return -1;
            if (bIsModified) return 1;
          }
  
          // Actualizando una existente
          if (!isNew && previousOrder !== null) {
            // Moviendo hacia abajo (ej: 2 -> 3), debe quedar *después*
            if (aIsModified && a.order > previousOrder) return 1;
            if (bIsModified && b.order > previousOrder) return -1;
  
            // Moviendo hacia arriba (ej: 3 -> 2), debe quedar *antes*
            if (aIsModified && a.order < previousOrder) return -1;
            if (bIsModified && b.order < previousOrder) return 1;
          }
  
          // Si nada de lo anterior aplica, usar brandId como último recurso
          return a.brandId - b.brandId;
        }
  
        return a.order - b.order;
      });
  
      const reordered = sortedBrands.map((brand, i) => ({
        ...brand,
        order: i + 1,
      }));
  
      await this.dao.updateAllOrdersBrands(reordered);
      return reordered;
    } catch (error) {
      throw error;
    }
  }
}

export default BrandsService;

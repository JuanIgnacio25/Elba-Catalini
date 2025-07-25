import NewsDao from "./NewsDao";
import toNumericId from "@/utils/toNumericId";
import {
  uploadImageToCloudinary,
  deleteImageFromCloudinary,
} from "@/utils/imageHandler/cloudinaryLayoutImagesHandler";

class NewsService {
  constructor() {
    this.dao = new NewsDao();
  }

  async createNews(news) {
    try {
      const allNews = await this.dao.getAllNews();
      const total = allNews.length;

      // Si el orden es mayor al largo del array se pone el valor del largo del array
      const order = news.order > total + 1 ? total + 1 : news.order;
      const newNewsData = { ...news, order };
      
      const newNews = await this.dao.createNews(newNewsData);

      await this.reorderNews(newNews.newsId , null , true);
      
      return await this.dao.getAllNews();;
    } catch (error) {
      throw error;
    }
  }

  async getAllNews() {
    try {
      const news = await this.dao.getAllNews();
      return news;
    } catch (error) {
      throw error;
    }
  }

  async deleteNews(id) {
    try {
      const newsId = toNumericId(id);
      const news = await this.dao.getNewsById(newsId);

      if (!news) throw new Error("La novedad no existe");

      await this.dao.deleteNews(newsId);
      await this.reorderNews();

      return await this.dao.getAllNews();
    } catch (error) {
      throw error;
    }
  }

  async updateNews(id, newsToUpdate) {
    try {
      const newsId = toNumericId(id);

      const news = await this.dao.getNewsById(newsId);
      if (!news) throw new Error("La novedad no existe");
      
      const updatedNews = await this.dao.updateNews(newsId, newsToUpdate);
      await this.reorderNews(updatedNews.newsId, news.order , false);

      return await this.getAllNews();
    } catch (error) {
      throw error;
    }
  }

  async handleUpdateNewsImage(newImage, oldImagePublicId) {
    try {
      await deleteImageFromCloudinary(oldImagePublicId);
      return await uploadImageToCloudinary(newImage, "news_preset");
    } catch (error) {
      throw error;
    }
  }

  async reorderNews(modifiedNewsId = null, previousOrder = null, isNew = false) {
    try {
      let allNews = await this.dao.getNews();

      const sortedNews = [...allNews].sort((a, b) => {
        if (a.order === b.order) {
          const aIsModified = a.newsId === modifiedNewsId;
          const bIsModified = b.newsId === modifiedNewsId;
  
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
  
          // Si nada de lo anterior aplica, usar newsId como último recurso
          return a.newsId - b.newsId;
        }
  
        return a.order - b.order;
      });
  
      const reordered = sortedNews.map((news, i) => ({
        ...news,
        order: i + 1,
      }));
  
      await this.dao.updateAllOrdersNews(reordered);
      return reordered;
    } catch (error) {
      throw error;
    }
  }
}

export default NewsService;

import News from "@/models/news/news";

class NewsDao {
  constructor() {
    this.collection = News;
  }

  async createNews(news) {
    try {
      const createdNews = await this.collection.create(news);
      return createdNews;
    } catch (error) {
      throw error;
    }
  }

  async getAllNews() {
    try {
      const news = await this.collection.find().sort({ order: 1 }).lean();

      const cleaned = news.map(({ _id, ...rest }) => rest);

      return cleaned;
    } catch (error) {
      throw error;
    }
  }

  async getNewsById(newsId) {
    try {
      const news = await this.collection.findOne({
        newsId,
      });
      return news;
    } catch (error) {
      throw error;
    }
  }

  async updateNews(newsId, dataToUpdate) {
    try {
      const updatedNews = this.collection.findOneAndUpdate(
        {
          newsId,
        },
        dataToUpdate,
        { new: true, runValidators: true }
      );

      if (!updatedNews) throw new Error("La Marca no existe");

      return updatedNews;
    } catch (error) {
      throw error;
    }
  }

  async deleteNews(newsId) {
    try {
      const deletedNews = await this.collection.findOneAndDelete({ newsId });

      if (!deletedNews) throw new Error("La marca no existe");

      return deletedNews;
    } catch (error) {
      throw error;
    }
  }

  async updateAllOrdersNews(newsOrders) {
    try {
      const operations = newsOrders.map((news) => ({
        updateOne: {
          filter: { newsId: news.newsId },
          update: { $set: { order: news.order } },
        },
      }));

      await this.collection.bulkWrite(operations);
    } catch (error) {
      throw error;
    }
  }
}

export default NewsDao;
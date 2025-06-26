import NewsService from "@/models/news/NewsService";
import { connectDB } from "../mongodb";

const newsService = new NewsService();

async function getNews(){
  try {
    await connectDB();
    const news = await newsService.getAllNews();
    
    return news;
  } catch (error) {
    return null;
  }
}

export default getNews;
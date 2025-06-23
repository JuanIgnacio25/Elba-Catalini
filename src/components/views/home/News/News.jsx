import getNews from "@/lib/api/getNews";
import NewsCarousel from "./NewsCarousel";

export const revalidate = 60;

async function News() {
  const news = await getNews();

  return <NewsCarousel news={news} />;
}

export default News;

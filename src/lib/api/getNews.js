
import { connectDB } from "../mongodb";



async function getNews(){
  try {
    const news = [
      {
        image: {
          url: "/7550ED.jpg",
        },
      },
      {
        image: {
          url: "/7550ED.jpg",
        },
      },
      {
        image: {
          url: "/7550ED.jpg",
        },
      },
      {
        image: {
          url: "/7550ED.jpg",
        },
      },
      {
        image: {
          url: "/7550ED.jpg",
        },
      },
      {
        image: {
          url: "/7550ED.jpg",
        },
      },
      {
        image: {
          url: "/7550ED.jpg",
        },
      },
    ];
    return news;
  } catch (error) {
    return null;
  }
}

export default getNews;
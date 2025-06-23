
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
          url: "https://elbacatalini.com/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdpjefhpjj%2Fimage%2Fupload%2Fv1739286046%2F8210ES.jpg&w=384&q=75",
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
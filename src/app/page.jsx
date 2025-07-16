import Home from "@/components/views/home/Home"
import { getSlidesDataWithBlur } from "@/lib/api/getSlidesDataWithBlur";

export const revalidate = 86400;

async function HomePage() {
  const slidesData = await getSlidesDataWithBlur();
  return (
    <Home slidesData={slidesData}/>
  )
}

export default HomePage

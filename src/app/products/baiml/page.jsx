import BaimlProducts from "@/components/views/Products/Baiml/BaimlProducts";

export async function generateMetadata() {
  return {
    title: `Faros Baiml`,
    description: "Faros Universales Baiml",
    openGraph: {
      title: "Faros Baiml",
      description: "Faros Universales Baiml",
      images: "https://res.cloudinary.com/dzvwrmykh/image/upload/v1750676088/vd8mym1rubdy4rj4blbo.png",
    },
  };
}

function baimlProductsPage() {
  return (
    <BaimlProducts/>
  )
}

export default baimlProductsPage
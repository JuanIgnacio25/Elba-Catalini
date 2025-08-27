import SimplifiedView from "@/components/views/Products/Baiml/SimplifiedView/SimplifiedView"

export async function generateMetadata() {
  return {
    title: "Faros Baiml - Vista Simplificada | Elba Catalini",
    description:
      "Faros Baiml originales. Distribuidor oficial en Argentina. Encontrá faros y repuestos Baiml para trailers y camiones en Elba Catalini.",
    keywords: [
      "Faros Baiml",
      "Baiml",
      "Faros para trailers",
      "Faros para camiones",
      "Faros universales",
    ],
    openGraph: {
      title: "Faros Baiml - Vista Simplificada | Elba Catalini",
      description:
        "Descubrí la línea completa de Faros Baiml en Elba Catalini.",
      url: "https://elbacatalini.com/products/baiml",
      siteName: "Elba Catalini",
      images: [
        {
          url: "https://res.cloudinary.com/dzvwrmykh/image/upload/v1750676088/vd8mym1rubdy4rj4blbo.png",
          alt: "Faros Baiml para camiones y trailers",
        },
      ],
      type: "website",
    },
    alternates: {
      canonical: "https://elbacatalini.com/products/baiml/simplifiedView",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

function simplifiedViewPage() {
  return (
    <SimplifiedView/>
  )
}

export default simplifiedViewPage
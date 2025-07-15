import ToxicShine from "@/components/views/Products/ToxicShine/ToxicShine"

export async function generateMetadata() {
  return {
    title: `Toxic Shine`,
    description: "Toxic Shine , productos para el cuidado y detailing del automotor.",
    openGraph: {
      title: "Toxic Shine",
      description: "Toxic Shine , productos para el cuidado y detailing del automotor.",
      images: "https://res.cloudinary.com/dzvwrmykh/image/upload/v1750267461/wskrvvi3iqyv21w40eem.png",
    },
  };
}

function toxicShinePage() {
  return <ToxicShine/>
}

export default toxicShinePage
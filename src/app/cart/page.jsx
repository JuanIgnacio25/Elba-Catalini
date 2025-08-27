import Cart from "@/components/views/Cart/Cart";

export async function generateMetadata() {
  return {
    title: "Carrito de Compras | Elba Catalini",
    description:
      "Revisá tu carrito y gestioná tus compras de faros y repuestos Baiml en Elba Catalini, distribuidor oficial en Argentina.",
    keywords: [
      "Carrito de compras",
      "Compra Baiml",
      "Faros Baiml",
      "Repuestos Baiml",
      "Elba Catalini",
    ],
    alternates: {
      canonical: "https://elbacatalini.com/cart",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

async function CartPage() {
  return <Cart/>;
}

export default CartPage;

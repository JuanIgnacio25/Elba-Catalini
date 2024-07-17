import CartService from "@/models/cart/CartService";
import Cart from "@/components/Cart/Cart";
import {connectDB} from "@/libs/mongodb";

const getCartById = async (id) => {
  const cartService = new CartService();
  try {
    await connectDB();
    const cart = await cartService.getCartById(id);
    return cart;
  } catch (error) {
    console.log(error);
  }
};

async function CartPage({ params }) {
  const { id } = params;
  const cart = await getCartById(id);
  const parsedCart = JSON.parse(JSON.stringify(cart));
  
  return <Cart cart={parsedCart}></Cart>;
}

export default CartPage;

import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

import { connectDB } from "@/lib/mongodb";
import CartService from "@/models/cart/CartService";
import OrderService from "@/models/order/OrderService";
import { isValidCommentsData } from "@/utils/validate/validateComments";
import validateQuantity from "@/utils/validate/validateQuantity";

const orderService = new OrderService();
const cartService = new CartService();

export async function POST(req) {
  try {
    const { cartData } = await req.json();
    const token = await getToken({
      req,
      cookieName:
        process.env.NODE_ENV === "development"
          ? "next-auth.session-token"
          : "__Secure-next-auth.session-token",
      secret: process.env.NEXTAUTH_SECRET,
    });

    await connectDB();
    
    const cart = await cartService.getCartById(token.user.cartId);

    if (cart.products.length === 0) {
      throw new Error("No se puede completar la compra de un carrito vacío");
    }

    // Validar que cada producto en cartData tenga un quantity válido
    cartData.productsCartInContext.forEach(product => {
      if(!validateQuantity(product.quantity)) throw new Error("La cantidad debe ser mayor a 0");
    });

    // Modificar sólo el quantity en memoria para los productos del carrito
    const updatedProducts = cart.products.map(cartProduct => {
      const cartDataProduct = cartData.productsCartInContext.find(p => p.productId === cartProduct.productId);
      
      if (!cartDataProduct) {
        throw new Error(`Producto con ID ${cartProduct.productId} no encontrado en los datos enviados.`);
      }

      // Si los quantities son diferentes, actualizar solo el quantity de cart.products
      if (cartDataProduct.quantity !== cartProduct.quantity) {
        cartProduct.quantity = cartDataProduct.quantity;
      }

      return cartProduct;
    });

    // Crear y cerrar la orden con los productos actualizados

    if (cartData.deliveryOption == null) throw new Error("Debe seleccionar una opcion para completar el pedido.");
    try {
      isValidCommentsData(cartData.comments);
    } catch (error) {
      throw new error("Comentario no valido");
    }
      
    const orderData = {
      id: token.user.id,
      companyName: token.user.companyName,
      email: token.user.email,
      carrier: cartData.deliveryOption === "address" ? token.user.carrier : "Retira Personalmente",
      address: token.user.address,
      location: token.user.location,
      cuit: token.user.cuit,
      purchasingManagerName: token.user.purchasingManagerName,
      phoneNumber: token.user.phoneNumber,
      comments: cartData.comments || "",
    };

    await orderService.closeOrder(updatedProducts,orderData);
    
    await cartService.clearCart(token.user.cartId);

    return NextResponse.json("Email Enviado");
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

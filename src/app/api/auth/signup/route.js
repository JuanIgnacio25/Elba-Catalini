import { NextResponse } from "next/server";

import { connectDB } from "@/libs/mongodb";
import { isValidSignup } from "@/utils/validateUser";
import UserService from "@/models/user/UserService";
import CartService from "@/models/cart/CartService";

const userService = new UserService();
const cartService = new CartService();

export async function POST(request) {
  const user = await request.json();

  try {
    isValidSignup(user);
  } catch (error) {
    return NextResponse.json({message: error.message}, {status: 400});
  }

  try {
    await connectDB();
    const userFound = await userService.getUserByEmail(user.email);

    if (userFound) {
      return NextResponse.json(
        { message: "El usuario ya existe" },
        { status: 409 }
      );
    }

    const createdCart = await cartService.createCart();
    user.cartId = createdCart.cartId;

    const savedUser = await userService.createUser(user);

    return NextResponse.json(
      { email: savedUser.email, fullname: savedUser.fullname },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

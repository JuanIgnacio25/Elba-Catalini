import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

import { connectDB } from "@/lib/mongodb";
import UserService from "@/models/user/UserService";
import TemporalUserService from "@/models/temporalUser/TemporalUserService";
import CartService from "@/models/cart/CartService";

const userService = new UserService();
const cartService = new CartService();
const temporalUserService = new TemporalUserService();

export async function GET(request, { params }) {
  const { token } = params;
  try {
    await connectDB();

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    const { email } = decode;
    const temporalUserFound = await temporalUserService.getTemporalUserByEmail(
      email
    );

    if(!temporalUserFound) throw new Error();

    const user = {
      companyName: temporalUserFound.companyName,
      cuit: temporalUserFound.cuit,
      phoneNumber: temporalUserFound.phoneNumber,
      purchasingManagerName: temporalUserFound.purchasingManagerName,
      location: temporalUserFound.location,
      address: temporalUserFound.address,
      carrier: temporalUserFound.carrier,
      password: temporalUserFound.password,
      email: temporalUserFound.email,
    };

    const createdCart = await cartService.createCart();
    user.cartId = createdCart.cartId;

    const savedUser = await userService.createUser(user);

    await temporalUserService.deleteTemporalUserByEmail(
      email
    );

    return NextResponse.json({ companyName:savedUser.companyName,email:savedUser.email }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "El link de verificacion no existe o a expirado" },
      { status: 400 }
    );
  }
}

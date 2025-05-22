import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

import { connectDB } from "@/lib/mongodb";
import UserService from "@/models/user/UserService";
import isValidPassword from "@/utils/validate/validatePassword";

const userService = new UserService();

export async function POST(request) {
  const { password, validatePassword, token } = await request.json();

  const currentTime = new Date();

  try {
    if (password !== validatePassword)
      throw new Error("Las contraseñas no coinciden");
    isValidPassword(password);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }

  try {
    await connectDB();

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { userId } = decoded;
   
    const user = await userService.getUserById(userId);
  
    if (user.recoveryToken !== token) throw new Error();
    if (user.recoveryTokenExpires < currentTime) throw new Error();

    await userService.changeUserPassword(user.userId,password);

    return NextResponse.json(`Ya puedes iniciar sesion con tu nueva contraseña!`);
  } catch (error) {
    return NextResponse.json(
      { message: "Link de recuperacion invalido o expirado" },
      { status: 409 }
    );
  }
}

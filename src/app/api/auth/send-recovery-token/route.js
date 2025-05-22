import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import isValidEmail from "@/utils/validate/validateUserEmail";
import UserService from "@/models/user/UserService";

const userService = new UserService();

export async function POST(request) {
  const { email } = await request.json();
  const currentTime = new Date();
  try {
    await connectDB();

    isValidEmail(email);

    const user = await userService.getUserByEmail(email);
    
    if (!user) throw new Error(`El usuario con email ${email} no existe`);

    if (user.recoveryToken && user.recoveryTokenExpires > currentTime)
      throw new Error(
        "Ya se envio un link para recuperar la contraseña a este mail"
      );

    await userService.createRecoveryTokenAndSendEmail(user.email,user.userId);
    
    return NextResponse.json(user.email);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

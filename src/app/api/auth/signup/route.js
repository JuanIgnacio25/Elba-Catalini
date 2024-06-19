import { NextResponse } from "next/server";
import bcryp from "bcryptjs";

import { connectDB } from "@/libs/mongodb";
import { isValidSignup } from "@/utils/validateAjv";
import UserService from "@/models/user/UserService";

const userService = new UserService();

export async function POST(request) {
  const data = await request.json();

  let signupError = undefined;
  try {
    isValidSignup(data);
  } catch (error) {
    signupError = error.message;
  }

  if (signupError) {
    return NextResponse.json({ message: signupError }, { status: 400 });
  }

  try {
    await connectDB();
    const userFound = await userService.getUserByEmail(data.email);

    if (userFound) {
      return NextResponse.json(
        { message: "El usuario ya existe" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcryp.hash(data.password, 12);

    const newUser = {
      fullname: data.fullname,
      email: data.email,
      password: hashedPassword,
    };

    const savedUser = await userService.createUser(newUser);

    return NextResponse.json(
      { email: savedUser.email, fullname: savedUser.fullname },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
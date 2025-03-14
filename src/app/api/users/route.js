import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

import { connectDB } from "@/libs/mongodb";
import UserService from "@/models/user/UserService";

const userService = new UserService();

export async function GET(req) {
  try {
    const token = await getToken({
      req,
      cookieName:
        process.env.NODE_ENV === "development"
          ? "next-auth.session-token"
          : "__Secure-next-auth.session-token",
      secret: process.env.NEXTAUTH_SECRET,
    });

    await connectDB();

    const users = await userService.getAllUsers();

    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

import { NextResponse } from "next/server";

import { connectDB } from "@/libs/mongodb";
import  UserService  from "@/models/user/UserService";

const userService = new UserService();


export async function GET() {
  await connectDB();
  
  try {
    const users = await userService.getAllUsers();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request){
  await connectDB();
  const data = await request.json();
  const users = await userService.createUser(data);
  return NextResponse.json(users);
}
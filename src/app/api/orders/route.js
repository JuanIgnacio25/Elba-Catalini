import { NextResponse } from "next/server";
import {getToken} from "next-auth/jwt"

import { connectDB } from "@/libs/mongodb";

import sendMail from "@/utils/mail";

export async function GET(request) {
  try {
    const res = await sendMail({to:"nachocolli1@gmail.com",subject:"Prueba",text:"Esto es un texto de prueba"});
    console.log(res);
    return NextResponse.json("Email Enviado");
  } catch (error) {
    console.log(error);
    return NextResponse.json({message: error.message} , {status: 400});
  }
}
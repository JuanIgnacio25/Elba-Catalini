import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { isValidSignup } from "@/utils/validate/validateUser";
import generateVerificationToken from "@/utils/token/generateVerificationToken";
import sendVerificationMail from "@/utils/mail/sendVerificationMail";
import UserService from "@/models/user/UserService";
import TemporalUserService from "@/models/temporalUser/TemporalUserService"

const userService = new UserService();
const temporalUserService = new TemporalUserService();

export async function POST(request) {
  const fullUser = await request.json();

  const {validatePassword, ...user} = fullUser;

  try {
    await connectDB();
    const userFound = await userService.getUserByEmail(user.email);

    if (userFound) {
      return NextResponse.json(
        { message: "Ya existe una cuenta vinculada a este email" },
        { status: 409 }
      );
    }

    const temporalUserFound = await temporalUserService.getTemporalUserByEmail(user.email);

    if(temporalUserFound) {
      return NextResponse.json(
        {message: "Ya se envio un codigo de verificacion a este email, si no lo encuentra revise la casilla de 'spam'"},
        {status: 409}
      )
    }

    try {
      if(user.password !== validatePassword) throw new Error("Las contraseñas no coinciden")
      isValidSignup(user);
    } catch (error) {
      return NextResponse.json({message: error.message}, {status: 400});
    }

    const verificationToken = generateVerificationToken(user.email);
    user.verificationToken = verificationToken;


    const savedTemporalUser = await temporalUserService.createTemporalUser(user);
    await sendVerificationMail(savedTemporalUser.email,savedTemporalUser.verificationToken);

    return NextResponse.json(
      { savedTemporalUser },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

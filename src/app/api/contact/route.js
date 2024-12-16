import { NextResponse } from "next/server";
import { isValidContactData } from "@/utils/validate/validateContactData";
import sendContactMessageMail from "@/utils/mail/sendContactMessageMail";

export async function POST(req) {
  try {

    const data = await req.formData();

    const contactData = Object.fromEntries(data);

    isValidContactData(contactData);

    await sendContactMessageMail(contactData);

    return NextResponse.json("Mensaje enviado correctamente , nuestro equipo de atencion al cliente se comunicara con usted!", { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

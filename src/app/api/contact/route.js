import { NextResponse } from "next/server";
import { isValidContactData } from "@/utils/validate/validateContactData";
import sendContactMessageMail from "@/utils/mail/sendContactMessageMail";

export async function POST(request) {
  try {
    const data = await request.formData();

    /* const images = data.getAll("images");

    const formFields = Object.fromEntries(
      [...data.entries()].filter(([key]) => key !== "images")
    ); */
    const contactData = Object.fromEntries(data);

    isValidContactData(contactData);

    /* if (images.length > 0) {
      const errors = validateImage(images);
      if (errors.length > 0)
        throw new Error("El formato del archivo no es válido o excede los 3MB");
    } */

    await sendContactMessageMail(contactData);

    return NextResponse.json("Llegaste rey", { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

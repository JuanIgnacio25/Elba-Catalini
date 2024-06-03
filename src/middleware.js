import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req });
  const url = req.nextUrl.clone();

  if (!token) {
    const destination = req.nextUrl.pathname + req.nextUrl.search;
    url.pathname = "/auth/login";
    url.searchParams.set("error", "Primero debes iniciar sesion");
    url.searchParams.set("callbackUrl", destination);

    return NextResponse.redirect(url);
  }

  if (req.nextUrl.pathname === "/dashboard" && token.user.rol !== "admin") {
    url.pathname = "/";
    url.searchParams.set("error", "No tienes permiso para acceder a esta página");
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/about","/dashboard"],
};

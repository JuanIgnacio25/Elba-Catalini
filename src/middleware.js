import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  console.log(req);
  console.log({secret:process.env.JWT_SECRET});
  const token = await getToken({ req, secret: process.env.JWT_SECRET });
  console.log({token:token});
  const url = req.nextUrl.clone();
  console.log({url:url});
  
  if (!token) {
    const destination = req.nextUrl.pathname + req.nextUrl.search;
    url.pathname = "/auth/login";
    url.searchParams.set("error", "Primero debes iniciar sesion");
    url.searchParams.set("callbackUrl", destination);

    return NextResponse.redirect(url);
  }

  if (req.nextUrl.pathname.startsWith("/admin")) {
    if (token.user.rol !== "admin") {
      url.pathname = "/";
      url.searchParams.set("error", "No tienes permiso para acceder a esta página");
      return NextResponse.redirect(url);
    }
  }

 /*  if (req.nextUrl.pathname === "/api/products" && req.method === "POST") {
    if (token.user.rol !== "admin") {
      return NextResponse.json(
        { message: "no tiene permiso para hacer esta peticion" },
        { status: 401 }
      );
    }
  } */

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", /* "/api/products" */],
};

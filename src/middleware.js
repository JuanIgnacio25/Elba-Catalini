import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({
    req,
    cookieName: process.env.NODE_ENV === "development" ? "next-auth.session-token" : "__Secure-next-auth.session-token",
    secret: process.env.NEXTAUTH_SECRET,
  });

  const url = req.nextUrl.clone();
  if (!token) {
    if (req.nextUrl.pathname.startsWith("/admin") ) {
      url.pathname = "/auth/login";
      url.searchParams.set("callbackUrl", req.nextUrl.pathname + req.nextUrl.search);
      url.searchParams.set("error", "Primero debes iniciar sesión");
      return NextResponse.redirect(url);
    }
    if(req.nextUrl.pathname.startsWith("/api/carts")){
      return NextResponse.json({message:'no tenes permitido padre'},{status:401});
    }
  }

  if (req.nextUrl.pathname.startsWith("/admin")) {
    if (token.user.rol !== "admin") {
      url.pathname = "/";
      url.searchParams.set("error", "No tienes permiso para acceder a esta página");
      return NextResponse.redirect(url);
    }
  }

  if (req.nextUrl.pathname === "/api/products" && req.method !== "GET") {
    if (!token || token.user.rol !== "admin") {
      return NextResponse.json(
        { message: "No tiene permiso para hacer esta petición" },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/products" , "/api/carts/:path*"],
};

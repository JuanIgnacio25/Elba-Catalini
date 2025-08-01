import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({
    req,
    cookieName:
      process.env.NODE_ENV === "development"
        ? "next-auth.session-token"
        : "__Secure-next-auth.session-token",
    secret: process.env.NEXTAUTH_SECRET,
  });

  const blockedPaths = ["/wordpress", "/wp-admin", "/wp-login.php"];

  if (blockedPaths.some((path) => req.nextUrl.pathname.includes(path))) {
    return NextResponse.json({ message: "Access denied" }, { status: 403 });
  }

  const url = req.nextUrl.clone();
  if (!token) {
    if (req.nextUrl.pathname.startsWith("/admin")) {
      url.pathname = "/auth/login";
      url.searchParams.set(
        "callbackUrl",
        req.nextUrl.pathname + req.nextUrl.search
      );
      url.searchParams.set("error", "Primero debes iniciar sesión");
      return NextResponse.redirect(url);
    }

    if (req.nextUrl.pathname.startsWith("/cart/confirmOrder") || req.nextUrl.pathname.startsWith("/cart/closedOrder")) {
      url.pathname = "/auth/login";
      url.searchParams.set(
        "callbackUrl",
        req.nextUrl.pathname + req.nextUrl.search
      );
      url.searchParams.set(
        "error",
        "Para continuar con tu pedido, primero debes iniciar sesión"
      );
      return NextResponse.redirect(url);
    }

    if (req.nextUrl.pathname.startsWith("/orderHistory")) {
      url.pathname = "/auth/login";
      url.searchParams.set(
        "callbackUrl",
        req.nextUrl.pathname + req.nextUrl.search
      );
      url.searchParams.set(
        "error",
        "Para ver tus pedidos , primero debes iniciar sesión"
      );
      return NextResponse.redirect(url);
    }

    if (req.nextUrl.pathname.startsWith("/api/carts")) {
      return NextResponse.json(
        { message: "Debes iniciar sesion primero" },
        { status: 401 }
      );
    }

    if (req.nextUrl.pathname.startsWith("/api/orders")) {
      return NextResponse.json(
        {
          message:
            "Para ver tus pedidos , primero debes iniciar sesion primero",
        },
        { status: 401 }
      );
    }
  }

  if (req.nextUrl.pathname.startsWith("/admin")) {
    if (token.user.rol !== "admin") {
      url.pathname = "/";
      url.searchParams.set(
        "error",
        "No tienes permiso para acceder a esta página"
      );
      return NextResponse.redirect(url);
    }
  }

  if (req.nextUrl.pathname.startsWith("/api/layoutImages")) {
    if (!token || token.user.rol !== "admin") {
      return NextResponse.json(
        { message: "No tiene permiso para hacer esta petición" },
        { status: 401 }
      );
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

  if (req.nextUrl.pathname === "/api/users") {
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
  matcher: [
    "/admin/:path*",
    "/cart/confirmOrder",
    "/cart/closedOrder", 
    "/orderHistory",
    
    "/api/products",
    "/api/carts/:path*",
    "/api/orders/:path*",
    "/api/users/:path*",
    "/api/layoutImages/:path*",

    "/wordpress/:path*",
    "/wp-admin/:path*",
    "/wp-login.php",
  ],
};

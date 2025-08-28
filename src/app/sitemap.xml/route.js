import { getAllProducts } from "@/lib/api/getAllProducts";
import { NextResponse } from "next/server";

import {
  STORE_ELECTRICIDAD_SUBCATEGORIES,
  STORE_ACCESORIOS_SUBCATEGORIES,
  STORE_ILUMINACION_SUBCATEGORIES,
} from "@/constants/categories";

// Convierte subcategorías a slug de URL
const toUrlSlug = (str) => str.toLowerCase().replace(/\s+/g, "-");

export async function GET() {
  const products = await getAllProducts();

  const baseUrl = `${process.env.NEXT_PUBLIC_WEBSITE_DOMAIN}`;
  const normalizedBaseURL = baseUrl.endsWith("/")
    ? baseUrl.slice(0, -1)
    : baseUrl;

  const staticRoutes = [
    "",
    "/products",
    "/contact",
    "/cart",
    "/products/baiml",
    "/products/baiml/simplifiedView",
    "/products/toxic-shine",
    "/products/store/Electricidad",
    "/products/store/Accesorios",
    "/products/store/Iluminacion",
    "/products/store/3M",
  ];

  // Subcategorías con prioridad 0.8
  const storeRoutes = [
    {
      route: "/products/store/Electricidad/cable-tpr/coelpla",
      priority: "0.7",
    },
    {
      route:
        "/products/store/Electricidad/enchufes/enchufes-de-aluminio",
      priority: "0.7",
    },
    {
      route: "/products/store/Electricidad/enchufes/enchufes-de-pvc",
      priority: "0.7",
    },
    {
      route:
        "/products/store/Electricidad/enchufes/enchufes-vulcanizados",
      priority: "0.7",
    },
  ];

  STORE_ELECTRICIDAD_SUBCATEGORIES.forEach((sub) =>
    storeRoutes.push({
      route: `/products/store/Electricidad/${toUrlSlug(sub)}`,
      priority: "0.8",
    })
  );

  STORE_ACCESORIOS_SUBCATEGORIES.forEach((sub) =>
    storeRoutes.push({
      route: `/products/store/Accesorios/${toUrlSlug(sub)}`,
      priority: "0.8",
    })
  );

  STORE_ILUMINACION_SUBCATEGORIES.forEach((sub) =>
    storeRoutes.push({
      route: `/products/store/Iluminacion/${toUrlSlug(sub)}`,
      priority: "0.8",
    })
  );

  const dynamicProductRoutes = products
    .filter((p) => p.slug)
    .map((p) => ({
      route: `/products/${p.productId}/${p.slug}`,
      priority: "0.6",
    }));

  // Convertimos staticRoutes a objetos con priority
  const staticRoutesObj = staticRoutes.map((route) => {
    let priority = "0.6";

    if (route === "") priority = "1.0";
    else if (
      route === "/products" ||
      route === "/products/baiml" ||
      route === "/products/toxic-shine" ||
      route.startsWith("/products/store/")
    )
      priority = "0.9";
    else if (
      route === "/contact" ||
      route === "/products/baiml/simplifiedView" ||
      route === "/cart"
    )
      priority = "0.7";

    return { route, priority };
  });

  const allRoutes = Array.from(
    new Set([...staticRoutesObj, ...storeRoutes, ...dynamicProductRoutes])
  );

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(
    ({ route, priority }) => `
  <url>
    <loc>${normalizedBaseURL}${route}</loc>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`
  )
  .join("")}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}

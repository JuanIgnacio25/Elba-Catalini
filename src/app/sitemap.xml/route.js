import { getAllProducts } from '@/lib/api/getAllProducts'
import { NextResponse } from 'next/server'

export async function GET() {
  const products = await getAllProducts()

  const baseUrl = `${process.env.NEXT_PUBLIC_WEBSITE_DOMAIN}`

  const staticRoutes = [
    '',
    '/products',
    '/contact',
    '/products/baiml',
    '/products/baiml/simplifiedView',
    '/products/toxic-shine',
    '/products/store/Electricidad',
    '/products/store/Accesorios',
    '/products/store/Iluminacion',
    '/products/store/3M'
  ]

  const dynamicProductRoutes = products
    .filter((p) => p.slug)
    .map(
      (p) => `/products/${p.productId}/${p.slug}`
    )

  const allRoutes = Array.from(new Set([...staticRoutes, ...dynamicProductRoutes]))

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(
    (route) => `
  <url>
    <loc>${baseUrl}${route}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`
  )
  .join('')}
</urlset>`

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml'
    }
  })
}
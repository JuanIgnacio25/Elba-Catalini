import { NextResponse } from 'next/server'

export function GET() {
  const content = `
User-agent: *
Allow: /

Disallow: /auth/
Disallow: /cart/
Disallow: /cart/confirmOrder
Disallow: /orderHistory
Disallow: /admin/

Sitemap: ${process.env.NEXT_PUBLIC_WEBSITE_DOMAIN}/sitemap.xml
  `.trim()

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain',
    },
  })
}
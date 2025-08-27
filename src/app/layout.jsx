import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar/NavBar";
import Sale from "@/components/Sale/Sale";
import Footer from "@/components/Footer/Footer";
import FixedActions from "@/components/FixedActions/FixedActions";
import Providers from "./Providers";

import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata = {
  metadataBase: new URL("https://elbacatalini.com"),
  title: "Elba Catalini | Autopartes Eléctricas - Accesorios y Más",
  description: "Encontra toda la linea de productos Baiml, Toxic Shine y más en Elba Catalini. ¡Envíos a todo el país!",
  alternates: {
    canonical: "https://elbacatalini.com/products/baiml",
  },
  robots: {
    index: true,
    follow: true,
  },
  author: "Juan Ignacio Colli",
  keywords: "autopartes eléctricas, accesorios automotor, cosmetica automotor , Faros universales Baiml , Baiml ,Faros Baiml ,faros para el agro Baiml, Toxic Shine, Lux Led , Iron Led , Iael , QKL , 3M ,  iluminación automotriz, faros universales, venta online, Cañada de Gómez, Argentina, envío a domicilio",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Elba Catalini - Tienda Online - Distribuidor oficial Baiml",
    description: "Compra productos Baiml , Toxic Shine y mucho mas al mejor precio!.",
    url: "https://elbacatalini.com",
    siteName: "Elba Catalini",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
    twitter: {
      card: "summary_large_image",
      title: "Elba Catalini - Tienda Online",
      description:
        "Compra productos Baiml , Toxic Shine y mucho mas a precio promocional!.",
      images: ["/og-image.png"],
    },
  },
};

export default function RootLayout({ children }) {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Elba Catalini",
    "url": "https://elbacatalini.com",
    "logo": "https://elbacatalini.com/logo-elba.png",
    "description":
      "Autopartes eléctricas y accesorios para automotor. Distribuidor oficial Baiml, Toxic Shine, Lux Led, Iron Led y más.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Cañada de Gómez",
      "addressRegion": "Santa Fe",
      "addressCountry": "AR"
    },
    "sameAs": [
      "https://www.instagram.com/la_casa_del_acceso_/",
      "https://www.facebook.com/ElbaCatalini"
    ]
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body className={inter.className}>
        <Providers>
          <NavBar />
          <Sale />
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              className: "!bg-black !text-white !border !border-white z-[9999]",
              duration: 4000,
            }}
          />
          <FixedActions />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

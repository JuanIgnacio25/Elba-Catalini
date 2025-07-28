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
  description: "Encuentra las mejores autopartes eléctricas y accesorios para tu vehículo en Elba Catalini. Amplia variedad de productos Baiml, Toxic Shine y más. ¡Envíos a todo el país!",
  author: "Juan Ignacio Colli",
  keywords: "autopartes eléctricas, accesorios automotor, cosmetica automotor , faros para el agro Baiml, Toxic Shine, Lux Led , Iron Led , Iael , QKL , 3M ,  iluminación automotriz, faros universales, venta online, Cañada de Gómez, Argentina, envío a domicilio",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Elba Catalini - Tienda Online",
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
  /* charset: "UTF-8",
  ogTitle: "Tu Aplicación Next.js",
  ogDescription: "Descripción de tu aplicación Next.js para redes sociales",
  ogImage: "/path/to/your/image.jpg",
  ogUrl: "https://la-casa-del-accesorio-production.up.railway.app/",
  twitterCard: "summary_large_image",
  twitterCreator: "@tuTwitterHandle", */
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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

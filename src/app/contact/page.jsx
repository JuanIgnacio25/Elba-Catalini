import Contact from "@/components/views/contact/Contact"

export const metadata = {
  title: "Contacto | Elba Catalini",
  description: "Contactate con nuestro equipo de ventas o soporte para solucionar tus dudas!",
  alternates: {
    canonical: "https://elbacatalini.com/contact",
  },
  robots: {
    index: true,
    follow: true,
  },
};

function contactPage() {
  return (
    <Contact/>
  )
}

export default contactPage
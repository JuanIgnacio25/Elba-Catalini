"use client"

import { IoMdArrowUp } from "react-icons/io";

export default function FixedActions() {
  return (
    <div className="fixed bottom-5 right-5 flex flex-col gap-4 z-50">
      <a
        href="https://wa.me/5493471589042"
        target="_blank"
        rel="noopener noreferrer"
        className=" w-11 h-11 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        aria-label="WhatsApp"
      >
        <img src="/whatsapp-logo.png" alt="WhatsApp" className="w-11 h-11" />
      </a>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="w-11 h-11 bg-gray-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-500 hover:text-gray-600 hover:scale-110 transition-all"
        aria-label="Volver arriba"
      >
        <IoMdArrowUp className="w-8 h-8"/>
      </button>
    </div>
  );
}

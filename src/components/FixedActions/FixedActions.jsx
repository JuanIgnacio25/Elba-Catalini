"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import { IoMdArrowUp } from "react-icons/io";

export default function FixedActions() {
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-3 flex flex-col items-center gap-4 z-50">
      <div className="w-9 md:w-11 h-9 md:h-11">
        {showScrollButton && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="w-9 md:w-11 h-9 md:h-11 bg-gray-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-500 hover:text-gray-600 hover:scale-110 transition-all"
            aria-label="Volver arriba"
          >
            <IoMdArrowUp className="w-8 h-8" />
          </button>
        )}
      </div>

      <a
        href="https://wa.me/5493471589042"
        target="_blank"
        rel="noopener noreferrer"
        className="w-9 md:w-11 h-9 md:h-11 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        aria-label="WhatsApp"
      >
        <Image
          src="/whatsapp-logo.png"
          alt="WhatsApp"
          width={44}
          height={44}
        />
      </a>
    </div>
  );
}

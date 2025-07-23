"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import Image from "next/image";

const MODAL_KEY = "sale_modal_last_shown";
const SHOW_INTERVAL_MINUTES = 30;

export default function SaleModal({ saleImage }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const lastShown = localStorage.getItem(MODAL_KEY);
    const now = Date.now();

    if (!lastShown || now - Number(lastShown) > SHOW_INTERVAL_MINUTES * 60 * 1000) {
      setOpen(true); // Solo se abre si pasaron 30 min o nunca se mostró
    }
  }, []);

  const handleOpenChange = (isOpen) => {
    setOpen(isOpen);
    if (!isOpen) {
      localStorage.setItem(MODAL_KEY, String(Date.now()));
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-[93vw] sm:max-w-2xl p-0 rounded-lg border-none">
        <VisuallyHidden>
          <DialogTitle>Imagen de Novedades o Promociones</DialogTitle>
        </VisuallyHidden>
        <VisuallyHidden>
          <DialogDescription>
            Imagen que aparece en el inicio de la web con alguna novedad o
            promoción. Si la cerrás, no vuelve a aparecer durante 30 minutos.
          </DialogDescription>
        </VisuallyHidden>
        <div className="relative w-full h-auto aspect-[16/9]">
          <Image
            src={saleImage.image.secure_url}
            alt="Imagen promocional"
            fill
            className="object-contain rounded-lg"
            sizes="(max-width: 768px) 95vw, 700px"
            priority
            placeholder="blur"
            blurDataURL={
              saleImage.blurDataURL ||
              "data:image/png;base64,iVBORw0KGgoAAAANSUg honourable"
            }
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
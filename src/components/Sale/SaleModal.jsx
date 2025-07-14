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

export default function SaleModal({ saleImage }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const hasSeenModal = sessionStorage.getItem("sale_modal_shown");
    if (!hasSeenModal) {
      setOpen(true);
      sessionStorage.setItem("sale_modal_shown", "true");
    }
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-[93vw] sm:max-w-2xl p-0 rounded-lg border-none">
        <VisuallyHidden>
          <DialogTitle>Imagen de Novedades o Promociones</DialogTitle>
        </VisuallyHidden>
        <VisuallyHidden>
          <DialogDescription>
            Imagen que aparece en el inicio de la web con alguna novedad o
            promoción, si la cerrás no vuelve a aparecer.
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
            blurDataURL={saleImage.blurDataURL || "data:image/png;base64,iVBORw0KGgoAAAANSUg honourable"}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

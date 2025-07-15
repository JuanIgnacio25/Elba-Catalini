import { useState } from "react";

import SaleForm from "./SaleForm";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import { MdEdit } from "react-icons/md";

function SaleDialogButton({saleImage,handleChangeImage}) {

  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleSaleImageChange = (newImage) => {
    handleChangeImage(newImage)
    setIsFormOpen(false);
  }

  return (
    <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
      <DialogTrigger asChild>
        <Button> <MdEdit/>Cambiar Imagen</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Cambiar imagen del PopUp</DialogTitle>
          <VisuallyHidden>
            <DialogDescription>
              Modificá los datos de la marca seleccionada.
            </DialogDescription>
          </VisuallyHidden>
        </DialogHeader>
        <SaleForm
          saleImage={saleImage}
          onSubmit={handleSaleImageChange}
          onCancel={() => setIsFormOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}

export default SaleDialogButton;

"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { saleImageSchema } from "@/utils/validate/schemas/saleFormsSchema";
import { handleImagePreview } from "@/utils/imageHelpers";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Image from "next/image";

function SaleForm({ saleImage, onSubmit }) {
  const form = useForm({
    resolver: zodResolver(saleImageSchema),
    defaultValues: {
      image: saleImage,
    },
  });

  const [imagePreviewUrl, setImagePreviewUrl] = useState(saleImage);

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    form.reset({
      image: saleImage,
    });

    setImagePreviewUrl(saleImage);

    return () => {
      if (imagePreviewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreviewUrl);
      }
    };
  }, [saleImage]);

  const onFormSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();

      const isNewImage = values.image instanceof File;

      if (isNewImage) {
        formData.append("image", values.image);
      }

      const res = await axios.put(`/api/layoutImages/sale`, formData);

      onSubmit(res.data.image.secure_url);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="image"
          render={({ field: { value, onChange, ...rest } }) => (
            <FormItem>
              <FormControl>
                <div className="flex flex-col items-center gap-2">
                  {/* Label con apariencia de input */}
                  <label
                    htmlFor="file-upload"
                    className="flex w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background cursor-pointer hover:bg-accent hover:text-accent-foreground transition"
                  >
                    <span className="text-muted-foreground">
                      {value instanceof File
                        ? value.name
                        : "Sin Archivo Seleccionado"}
                    </span>
                    <span className="text-primary font-medium">
                      Seleccionar Imagen
                    </span>
                  </label>

                  {/* Input oculto */}
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    id="file-upload"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      onChange(file);
                      handleImagePreview(
                        e,
                        imagePreviewUrl,
                        setImagePreviewUrl
                      );
                    }}
                    {...rest}
                  />

                  {/* Previsualización */}
                  {imagePreviewUrl && (
                    <div className="mt-2 text-center">
                      <Image
                        src={imagePreviewUrl}
                        alt="Previsualización"
                        width={150}
                        height={150}
                        className="object-contain rounded-md border mx-auto"
                      />
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2 pt-4">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Subiendo..." : "Cambiar Imagen"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default SaleForm;

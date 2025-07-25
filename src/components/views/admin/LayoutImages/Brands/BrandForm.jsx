"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { brandFormSchema } from "@/utils/validate/schemas/brandFormsSchema";
import { handleImagePreview } from "@/utils/imageHelpers";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";

function BrandForm({ brand, onSubmit, onCancel, brandsLength }) {
  const form = useForm({
    resolver: zodResolver(brandFormSchema),
    defaultValues: {
      name: brand?.name || "",
      image: brand?.image.url || "",
      order: Number.isFinite(brand?.order) ? brand.order : brandsLength + 1,
    },
  });

  const [imagePreviewUrl, setImagePreviewUrl] = useState(
    brand?.image.url || ""
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    form.reset({
      name: brand?.name || "",
      image: brand?.image.url || "",
      order: Number.isFinite(brand?.order) ? brand.order : brandsLength + 1,
    });
    setImagePreviewUrl(brand?.image.url || "");

    return () => {
      if (imagePreviewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreviewUrl);
      }
    };
  }, [brand]);

  const onFormSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();

      const isNewImage = values.image instanceof FileList;

      if (isNewImage && values.image.length > 0) {
        const file = values.image[0];
        formData.append("image", file);
      }

      formData.append("order", values.order);
      formData.append("name", values.name);

      let res;

      if (brand) {
        res = await axios.put(
          `/api/layoutImages/brands/${brand.brandId}`,
          formData
        );
      } else {
        res = await axios.post("/api/layoutImages/brands", formData);
      }

      onSubmit(res.data);
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre de la Marca</FormLabel>
              <FormControl>
                <Input placeholder="Ej. Toxic Shine" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field: { value, onChange, ...rest } }) => (
            <FormItem>
              <FormLabel>Imagen de la Marca</FormLabel>
              <FormControl>
                <div>
                  <Input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    {...rest}
                    onChange={(e) => {
                      onChange(e.target.files);
                      handleImagePreview(
                        e,
                        imagePreviewUrl,
                        setImagePreviewUrl
                      );
                    }}
                  />
                  {imagePreviewUrl && (
                    <div className="mt-2 text-center">
                      <Image
                        src={imagePreviewUrl}
                        alt="Previsualización"
                        width={100}
                        height={100}
                        className="object-contain rounded-md border p-1 mx-auto"
                      />
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="order"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Orden</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  value={field.value ?? ""}
                  min={1}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value === ""
                        ? "" // permite borrar momentáneamente
                        : parseInt(e.target.value, 10)
                    )
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? "Subiendo..."
              : brand
              ? "Guardar Cambios"
              : "Añadir Marca"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default BrandForm;

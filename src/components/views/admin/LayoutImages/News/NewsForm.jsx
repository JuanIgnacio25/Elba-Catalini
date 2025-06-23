"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { brandFormSchema } from '@/utils/validate/schemas/brandFormsSchema';
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


function NewsForm({ news, onSubmit, onCancel, newsLength }) {
  const form = useForm({
    resolver: zodResolver(brandFormSchema),
    defaultValues: {
      name: news?.name || "",
      image: news?.image.url || "",
      order: Number.isFinite(news?.order) ? news.order : newsLength + 1,
    },
  });

  const [imagePreviewUrl, setImagePreviewUrl] = useState(
    news?.image.url || ""
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    form.reset({
      name: news?.name || "",
      image: news?.image.url || "",
      order: Number.isFinite(news?.order) ? news.order : newsLength + 1,
    });
    setImagePreviewUrl(news?.image.url || "");

    return () => {
      if (imagePreviewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreviewUrl);
      }
    };
  }, [news]);

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

      if (news) {
        res = await axios.put(
          `/api/layoutImages/news/${news.newId}`,
          formData
        );
      } else {
        res = await axios.post("/api/layoutImages/news", formData);
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
              : news
              ? "Guardar Cambios"
              : "Añadir Marca"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default NewsForm;
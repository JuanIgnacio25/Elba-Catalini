"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newsFormSchema } from "@/utils/validate/schemas/newsFormsSchema";

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

function NewsForm({ news, onSubmit, onCancel, newsLength }) {
  const form = useForm({
    resolver: zodResolver(newsFormSchema(news)),
    defaultValues: {
      productId: news?.productId || "",
      order: Number.isFinite(news?.order) ? news.order : newsLength + 1,
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    form.reset({
      productId: news?.productId || "",
      order: Number.isFinite(news?.order) ? news.order : newsLength + 1,
    });
  }, [news]);

  const onFormSubmit = async (values) => {
    setIsSubmitting(true);
    setError(false);
    try {
      let res;

      if (news) {
        res = await axios.put(`/api/layoutImages/news/${news.newsId}`, {
          order: values.order,
        });
      } else {
        res = await axios.post(`/api/layoutImages/news/`, values);
      } 

      onSubmit(res.data);
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-4">
        {!news && (
          <FormField
            control={form.control}
            name="productId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Id del Producto</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    value={field.value ?? ""}
                    min={1}
                    onClick={() => setError(false)}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value === ""
                          ? ""
                          : parseInt(e.target.value, 10)
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

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
                  onClick={() => setError(false)}
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
      <div className="bg-red-500/50">
        <p className="text-sm text-bold text-center">{error}</p>
      </div>
    </Form>
  );
}

export default NewsForm;

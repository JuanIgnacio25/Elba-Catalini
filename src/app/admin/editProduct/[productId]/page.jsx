"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { useProduct } from "@/context/ProductContext";
import axios from "axios";

import { IoMdCloseCircle } from "react-icons/io";

import { BAIML_CATEGORIES } from "@/constants/categories";
import { TOXIC_SHINE_CATEGORIES } from "@/constants/categories";
import { STORE_CATEGORIES } from "@/constants/categories";

function UpdateProductPage() {
  const params = useParams();
  const router = useRouter();

  const { fetchAllProducts } = useProduct();

  const { productId } = params;

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState("");
  const [error, setError] = useState(null);
  const [warningMessage, setWarningMessage] = useState(null);
  const [deletingImage, setDeletingImage] = useState(false);

  const fetchProductById = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/products/${productId}`);
      setProduct(res.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    fetchProductById();
  }, [fetchProductById]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    let productToUpdate = {};

    if (product.kind === "Baiml") {
      productToUpdate = {
        kind: product.kind,
        name: product.name,
        nameForOrders: product.nameForOrders,
        sku: product.sku,
        description: product.description,
        unit: product.unit,
        category: product.category,
        productSet: Number(product.productSet),
      };
    }

    if (product.kind === "Store") {
      productToUpdate = {
        kind: product.kind,
        name: product.name,
        nameForOrders: product.nameForOrders,
        sku: product.sku,
        description: product.description,
        unit: product.unit,
        category: product.category,
        subCategory: product.subCategory,
      };
    }

    try {
      await axios.patch(`/api/products/${productId}`, productToUpdate);
      await fetchAllProducts();
      router.push("/admin/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddImage = async (e) => {
    const formData = new FormData();
    const files = e.target.files;

    formData.append("image", files[0]);

    try {
      const res = await axios.patch(
        `/api/products/${productId}/images`,
        formData
      );
      console.log(res);
      await fetchProductById();
      await fetchAllProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteImage = async (public_id) => {
    try {
      if (product.images.length === 1) {
        setWarningMessage(
          "No puedes eliminar la única imagen del producto , agrega una imagen antes de eliminarla"
        );
        return;
      }
      setDeletingImage(public_id);
      await axios.delete(`/api/products/${productId}/images/${public_id}`);
      await fetchProductById();
      await fetchAllProducts();
      setDeletingImage(false);
    } catch (error) {
      console.log(error);
      setDeletingImage(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  if (error) return <h1>Error</h1>;

  return (
    <div>
      <form onSubmit={handleUpdate} className="text-black" id="edit-form">
        <h1>Update Product</h1>
        <input
          type="text"
          placeholder="1035a"
          name="name"
          autoComplete="name"
          required={true}
          value={product.name}
          onChange={(e) => {
            setProduct((prevProduct) => ({
              ...prevProduct,
              name: e.target.value,
            }));
          }}
        />

        <input
          type="text"
          placeholder="FARO 1035.A"
          name="nameForOrders"
          autoComplete="nameForOrders"
          required={true}
          value={product.nameForOrders}
          onChange={(e) => {
            setProduct((prevProduct) => ({
              ...prevProduct,
              nameForOrders: e.target.value,
            }));
          }}
        />

        <input
          type="text"
          placeholder="sku"
          name="sku"
          value={product.sku}
          autoComplete="sku"
          required={true}
          onChange={(e) =>
            setProduct((prevProduct) => ({
              ...prevProduct,
              sku: e.target.value,
            }))
          }
        />

        <textarea
          type="text"
          placeholder="Excelente prod"
          name="description"
          autoComplete="description"
          value={product.description}
          required={true}
          onChange={(e) => {
            setProduct((prevProduct) => ({
              ...prevProduct,
              description: e.target.value,
            }));
          }}
        />

        <input
          type="text"
          placeholder="12"
          name="unit"
          autoComplete="unit"
          required={true}
          value={product.unit}
          onChange={(e) => {
            setProduct((prevProduct) => ({
              ...prevProduct,
              unit: e.target.value,
            }));
          }}
        />

        {product.kind === "Baiml" && (
          <>
            <select
              id="options"
              value={product.category}
              onChange={(e) => {
                setProduct((prevProduct) => ({
                  ...prevProduct,
                  category: e.target.value,
                }));
              }}
            >
              <option value="" disabled hidden>
                Category
              </option>
              {BAIML_CATEGORIES.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <input
              type="number"
              placeholder="2"
              name="productSet"
              autoComplete="set"
              required={true}
              value={product.productSet}
              onChange={(e) => {
                setProduct((prevProduct) => ({
                  ...prevProduct,
                  productSet: e.target.value,
                }));
              }}
            />
          </>
        )}

        {product.kind === "Store" && (
          <>
            <select
              id="options"
              value={product.category}
              onChange={(e) => {
                setProduct((prevProduct) => ({
                  ...prevProduct,
                  category: e.target.value,
                }));
              }}
            >
              <option value="" disabled hidden>
                Category
              </option>
              {STORE_CATEGORIES.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>

            {product.category === "Toxic Shine" && (
              <select
                id="toxic-options"
                value={product.subCategory}
                onChange={(e) =>
                  setProduct((prevProduct) => ({
                    ...prevProduct,
                    subCategory: e.target.value,
                  }))
                }
              >
                <option value="" disabled hidden>
                  Category
                </option>
                {TOXIC_SHINE_CATEGORIES.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}

            {product.category !== "Toxic Shine" && (
              <input
                type="text"
                placeholder="SubCategory"
                name="SubCategory"
                value={product.subCategory}
                autoComplete="subCategory"
                onChange={(e) =>
                  setProduct((prevProduct) => ({
                    ...prevProduct,
                    subCategory: e.target.value,
                  }))
                }
              />
            )}
          </>
        )}
        <div className="sm:col-span-3">
          <label
            htmlFor="images"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Imágenes del Producto
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleAddImage}
            /* ref={imageInputRef} */
            onClick={() => setWarningMessage(null)}
            className="hidden"
            id="file-upload"
          />

          {/* Botón Estilizado */}
          <label
            htmlFor="file-upload"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg cursor-pointer hover:bg-red-800"
          >
            Seleccionar imágenes
          </label>
          {product.images.length > 0 && (
            <div className="mt-4 grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <div key={index} className="relative flex justify-center">
                  {deletingImage && deletingImage == image.public_id ? (
                    <div>Loading...</div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleDeleteImage(image.public_id)}
                      className="absolute top-1 right-1 text-red-500 text-lg"
                    >
                      <IoMdCloseCircle />
                    </button>
                  )}

                  <Image
                    src={image.url}
                    alt={`Uploaded image ${index + 1}`}
                    width={210}
                    height={210}
                    className="rounded-lg border border-gray-300 dark:border-gray-600"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="text-red-500 font-semibold">{warningMessage}</div>
        <button className="bg-white">Update Product</button>
      </form>
    </div>
  );
}

export default UpdateProductPage;

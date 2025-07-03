"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import axios from "axios";

import { useProduct } from "@/context/ProductContext";

import {
  BAIML_CATEGORIES,
  TOXIC_SHINE_CATEGORIES,
  STORE_CATEGORIES,
  STORE_ELECTRICIDAD_SUBCATEGORIES,
  STORE_ILUMINACION_SUBCATEGORIES,
  STORE_ACCESORIOS_SUBCATEGORIES,
} from "@/constants/categories";

import ProductsFormFallback from "@/components/Fallbacks/ProductsFormFallback";
import { IoMdCloseCircle } from "react-icons/io";

function EditProduct() {
  const params = useParams();
  const router = useRouter();

  const { fetchAllProducts } = useProduct();

  const { productId } = params;

  const baimlOptions = [...BAIML_CATEGORIES];
  const toxicShineOptions = [...TOXIC_SHINE_CATEGORIES];
  const storeOptions = [...STORE_CATEGORIES];
  const storeElectricidadSubcategoriesOptions = [
    ...STORE_ELECTRICIDAD_SUBCATEGORIES,
  ];
  const storeIluminacionSubcategoriesOptions = [
    ...STORE_ILUMINACION_SUBCATEGORIES,
  ];
  const storeAccesoriosSubcategoriesOptions = [
    ...STORE_ACCESORIOS_SUBCATEGORIES,
  ];

  const [product, setProduct] = useState("");

  const [loading, setLoading] = useState(true);
  const [isUpdatingProduct, setIsUpdatingProduct] = useState(false);
  const [isLoadingImage, setisLoadingImage] = useState(false);
  const [deletingImage, setDeletingImage] = useState(false);
  const [error, setError] = useState(null);
  const [warningMessage, setWarningMessage] = useState(null);

  const fetchProductById = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/products/${productId}`);
      setProduct(res.data);
      setLoading(false);
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    fetchProductById();
  }, [fetchProductById]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    setIsUpdatingProduct(true);

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
        isElectronic: product.isElectronic === "true" ? true : false,
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

      if (
        (product.category === "Electricidad" &&
          product.subCategory === "Cable TPR") ||
        product.subCategory === "Enchufes"
      ) {
        productToUpdate.variantSubCategory = product.variantSubCategory;
      }
    }

    try {
      await axios.patch(`/api/products/${productId}`, productToUpdate);
      await fetchAllProducts();
      setIsUpdatingProduct(false);
      router.push("/admin/dashboard");
    } catch (error) {
      setWarningMessage(error.response.data.message);
    } finally {
      setIsUpdatingProduct(false);
    }
  };

  const handleAddImage = async (e) => {
    setisLoadingImage(true);
    const formData = new FormData();
    const files = e.target.files;

    formData.append("image", files[0]);

    try {
      await axios.patch(`/api/products/${productId}/images`, formData);
      setisLoadingImage(false);
      await fetchProductById();
      await fetchAllProducts();
    } catch (error) {
      setWarningMessage(error.response.data.message);
    } finally {
      setisLoadingImage(false);
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
      setWarningMessage(error.response.data.message);
      setDeletingImage(false);
    }
  };

  if (loading)
    return (
      <div className="w-full flex items-center justify-center my-8">
        <ProductsFormFallback />
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] md:min-h-[55vh] bg-gray-100 px-4">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 text-center mb-4">
          {error}
        </h1>
        <a
          href="/admin/dashboard"
          className="mt-4 px-4 py-1 md:mt-5 md:px-5 md:py-2 bg-red-600 text-white font-medium text-sm sm:text-base rounded-lg shadow-md hover:bg-red-700 transition"
        >
          Volver al Panel
        </a>
      </div>
    );

  return (
    <div className="w-full flex items-center  my-8">
      <div className="pb-4 mx-4 w-full lg:pb-6 border-2 border-solid border-gray-500 rounded-md bg-gray-100">
        <div className="flex w-full">
          <h2 className="p-4 text-2xl  font-bold text-gray-800 underline">
            Editar Producto
          </h2>
        </div>
        <form onSubmit={handleUpdate} className="px-4">
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 sm:gap-3">
            <div className="w-full">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Nombre
              </label>
              <input
                type="text"
                placeholder="Faro Baiml 1035.A"
                name="name"
                value={product.name}
                autoComplete="name"
                required={true}
                onChange={(e) => {
                  setProduct((prevProduct) => ({
                    ...prevProduct,
                    name: e.target.value,
                  }));
                }}
                id="name"
                className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg outline-none focus:border-red-600 block w-full p-2.5"
              />
            </div>

            <div className="w-full">
              <label
                htmlFor="nameForOrders"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Nombre Para Pedidos
              </label>
              <input
                type="text"
                placeholder="FARO 1035.A"
                name="nameForOrders"
                value={product.nameForOrders}
                autoComplete="off"
                required={true}
                onChange={(e) => {
                  setProduct((prevProduct) => ({
                    ...prevProduct,
                    nameForOrders: e.target.value,
                  }));
                }}
                id="nameForOrders"
                className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg outline-none focus:border-red-600 block w-full p-2.5"
              />
            </div>

            <div className="w-full">
              <label
                htmlFor="sku"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Sku
              </label>
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
                id="sku"
                className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg outline-none focus:border-red-600 block w-full p-2.5"
              />
            </div>

            <div className="w-full">
              <label
                htmlFor="unit"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Unidad
              </label>
              <input
                type="number"
                placeholder="12"
                name="unit"
                value={product.unit}
                autoComplete="unit"
                required={true}
                onChange={(e) => {
                  setProduct((prevProduct) => ({
                    ...prevProduct,
                    unit: e.target.value,
                  }));
                }}
                id="unit"
                className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg outline-none focus:border-red-600 block w-full p-2.5"
              />
            </div>

            {product.kind === "Baiml" && (
              <>
                <div>
                  <label
                    htmlFor="baiml-options"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Categoria
                  </label>
                  <select
                    id="baiml-options"
                    value={product.category}
                    onChange={(e) => {
                      setProduct((prevProduct) => ({
                        ...prevProduct,
                        category: e.target.value,
                      }));
                    }}
                    className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg outline-none focus:border-red-500 block w-full p-2.5"
                  >
                    <option value="" disabled hidden>
                      Categoria
                    </option>
                    {baimlOptions.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-full">
                  <label
                    htmlFor="ProductSet"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Juegos
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    name="productSet"
                    value={product.productSet}
                    autoComplete="set"
                    required={true}
                    onChange={(e) => {
                      setProduct((prevProduct) => ({
                        ...prevProduct,
                        productSet: e.target.value,
                      }));
                    }}
                    id="ProductSet"
                    className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg outline-none focus:border-red-600 block w-full p-2.5"
                  />
                </div>
                <div>
                  <label
                    htmlFor="isElectronic-options"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    ¿Es Electronico?
                  </label>
                  <select
                    id="isElectronic-options"
                    value={product.isElectronic}
                    onChange={(e) => {
                      setProduct((prevProduct) => ({
                        ...prevProduct,
                        isElectronic: e.target.value,
                      }));
                    }}
                    className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg outline-none focus:border-red-500 block w-full p-2.5"
                  >
                    <option value="" disabled hidden>
                      Categoria
                    </option>
                    <option value={true}>Si</option>
                    <option value={false}>No</option>
                  </select>
                </div>
              </>
            )}

            {product.kind === "Store" && (
              <>
                <div>
                  <label
                    htmlFor="baiml-options"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Categoria
                  </label>
                  <select
                    id="store-options"
                    value={product.category}
                    onChange={(e) => {
                      setProduct((prevProduct) => ({
                        ...prevProduct,
                        category: e.target.value,
                      }));
                    }}
                    className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg outline-none focus:border-red-500 block w-full p-2.5"
                  >
                    <option value="" disabled hidden>
                      Categoria
                    </option>
                    {storeOptions.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                {product.category === "Toxic Shine" && (
                  <div>
                    <label
                      htmlFor="toxic-options"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Sub Categoria
                    </label>
                    <select
                      id="toxic-options"
                      value={product.subCategory}
                      onChange={(e) =>
                        setProduct((prevProduct) => ({
                          ...prevProduct,
                          subCategory: e.target.value,
                        }))
                      }
                      className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg outline-none focus:border-red-500 block w-full p-2.5"
                    >
                      <option value="" disabled hidden>
                        Sub Categoria
                      </option>
                      {toxicShineOptions.map((option, index) => (
                        <option key={index} value={option} className="truncate">
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {product.category === "Electricidad" && (
                  <>
                    <div>
                      <label
                        htmlFor="store-subcategory-options"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Sub Categoria
                      </label>
                      <select
                        id="store-subcategory-options"
                        value={product.subCategory}
                        onChange={(e) =>
                          setProduct((prevProduct) => ({
                            ...prevProduct,
                            subCategory: e.target.value,
                          }))
                        }
                        className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg outline-none focus:border-red-500 block w-full p-2.5"
                      >
                        <option value="" disabled hidden>
                          Sub Categoria
                        </option>
                        {storeElectricidadSubcategoriesOptions.map(
                          (option, index) => (
                            <option key={index} value={option}>
                              {option}
                            </option>
                          )
                        )}
                      </select>
                    </div>
                    {product.subCategory === "Cable TPR" && (
                      <div>
                        <label
                          htmlFor="store-variantsubcategory-options"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Variante de Sub Categoria
                        </label>
                        <select
                          id="store-subcategory-options"
                          value={product.variantSubCategory}
                          onChange={(e) =>
                            setProduct((prevProduct) => ({
                              ...prevProduct,
                              variantSubCategory: e.target.value,
                            }))
                          }
                          className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg outline-none focus:border-red-500 block w-full p-2.5"
                        >
                          <option value="" disabled hidden>
                            Varianta de Sub Categoria
                          </option>
                          {["Coelpla"].map((option, index) => (
                            <option key={index} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    {product.subCategory === "Enchufes" && (
                      <div>
                        <label
                          htmlFor="store-variantsubcategory-options"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Variante de Sub Categoria
                        </label>
                        <select
                          id="store-subcategory-options"
                          value={product.variantSubCategory}
                          onChange={(e) =>
                            setProduct((prevProduct) => ({
                              ...prevProduct,
                              variantSubCategory: e.target.value,
                            }))
                          }
                          className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg outline-none focus:border-red-500 block w-full p-2.5"
                        >
                          <option value="" disabled hidden>
                            Variante de Sub Categoria
                          </option>
                          {[
                            "Enchufes de PVC",
                            "Enchufes de Aluminio",
                            "Enchufes Vulcanizados",
                          ].map((option, index) => (
                            <option key={index} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </>
                )}

                {product.category === "Iluminacion" && (
                  <div>
                    <label
                      htmlFor="store-subcategory-options"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Sub Categoria
                    </label>
                    <select
                      id="store-subcategory-options"
                      value={product.subCategory}
                      onChange={(e) =>
                        setProduct((prevProduct) => ({
                          ...prevProduct,
                          subCategory: e.target.value,
                        }))
                      }
                      className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg outline-none focus:border-red-500 block w-full p-2.5"
                    >
                      <option value="" disabled hidden>
                        Sub Categoria
                      </option>
                      {storeIluminacionSubcategoriesOptions.map(
                        (option, index) => (
                          <option
                            key={index}
                            value={option}
                            className="truncate"
                          >
                            {option}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                )}

                {product.category === "Accesorios" && (
                  <div>
                    <label
                      htmlFor="store-subcategory-options"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Sub Categoria
                    </label>
                    <select
                      id="store-subcategory-options"
                      value={product.subCategory}
                      onChange={(e) =>
                        setProduct((prevProduct) => ({
                          ...prevProduct,
                          subCategory: e.target.value,
                        }))
                      }
                      className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg outline-none focus:border-red-500 block w-full p-2.5"
                    >
                      <option value="" disabled hidden>
                        Sub Categoria
                      </option>
                      {storeAccesoriosSubcategoriesOptions.map(
                        (option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                )}

                {product.category === "3M" && (
                  <div>
                    <label
                      htmlFor="store-subcategory-options"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Sub Categoria
                    </label>
                    <select
                      id="store-subcategory-options"
                      value={product.subCategory}
                      onChange={(e) =>
                        setProduct((prevProduct) => ({
                          ...prevProduct,
                          subCategory: e.target.value,
                        }))
                      }
                      className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg outline-none focus:border-red-500 block w-full p-2.5"
                    >
                      <option value="" disabled hidden>
                        Sub Categoria
                      </option>
                      {["Bandas Reflectivas", "Circulos de Velocidad"].map(
                        (option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                )}
              </>
            )}
            <div className="sm:col-span-2">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Descripcion del Producto
              </label>
              <textarea
                type="text"
                placeholder="Unipolar Peso aprox.: Unidad: 90 g Caja x 12: 1230 g"
                name="description"
                value={product.description}
                autoComplete="description"
                required={true}
                onChange={(e) => {
                  setProduct((prevProduct) => ({
                    ...prevProduct,
                    description: e.target.value,
                  }));
                }}
                id="description"
                rows="11"
                className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg outline-none focus:border-red-600 block w-full p-2.5"
              ></textarea>
            </div>

            <div
              className={`${
                product.subCategory === "Enchufes" ||
                product.subCategory === "Cable TPR"
                  ? "col-span-1 sm:col-span-2 lg:col-span-2"
                  : "col-span-1 sm:col-span-2 lg:col-span-3"
              }`}
            >
              <label
                htmlFor="file-upload"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Imágenes del Producto
              </label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleAddImage}
                onClick={() => setWarningMessage(null)}
                className="hidden"
                id="file-upload"
              />

              {/* Botón Estilizado */}

              <label
                htmlFor="file-upload"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg cursor-pointer hover:bg-red-800"
              >
                {isLoadingImage ? (
                  <div className="flex justify-center items-center w-28 h-4">
                    <div className="border-2 border-t-2 border-t-gray-500 border-white border-solid w-6 h-6 rounded-full animate-spin"></div>
                  </div>
                ) : (
                  "Seleccionar Imagen"
                )}
              </label>

              {product.images.length > 0 && (
                <div
                  className={`mt-4 grid ${
                    product.subCategory === "Enchufes" ||
                    product.subCategory === "Cable TPR"
                      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2"
                      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                  } gap-2`}
                >
                  {product.images.map((image, index) => (
                    <div key={index} className="relative flex justify-center">
                      {deletingImage && deletingImage == image.public_id ? (
                        <div className="absolute top-1 right-1">
                          <div className="border-2 border-t-2 border-t-white border-gray-500 border-solid w-6 h-6 rounded-full animate-spin"></div>
                        </div>
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
          </div>
          <div className="flex justify-center w-full">
            <button
              type="submit"
              className="inline-flex items-center px-5 py-2 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-red-600 hover:bg-red-800 rounded-lg "
            >
              {isUpdatingProduct == false ? (
                "Editar Producto"
              ) : (
                <div className="flex justify-center items-center w-24 py-1 h-5">
                  <div className="border-2 border-t-2 border-t-gray-500 border-white border-solid w-6 h-6 rounded-full animate-spin"></div>
                </div>
              )}
            </button>
          </div>
          <div className="w-full flex justify-center text-red-500 font-semibold">
            {warningMessage}
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProduct;

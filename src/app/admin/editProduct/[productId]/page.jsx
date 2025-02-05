"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { useProduct } from "@/context/ProductContext";
import axios from "axios";

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

  const fetchProductById = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/products/${productId}`);
      setProduct(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
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

        <input
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

        <button className="bg-white">Update Product</button>
      </form>
    </div>
  );
}

export default UpdateProductPage;

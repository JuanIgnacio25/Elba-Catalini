"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";

function updateProductPage() {
  const params = useParams();
  const { productId } = params;

  const options = ["Posicion trasero", "Plafonier", "Ilumina Patente"];

  const [product, setProduct] = useState({
    category: "",
    description: "",
    name: "",
    unit: "",
  });

  const router = useRouter();

  const fetchProductById = async () => {
    

    try {
      const res = await axios.get(`/api/products/${productId}`);
      setProduct(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProductById();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const productToUpdate = {
      name:product.name,
      category:product.category,
      description:product.description,
      unit:product.unit,
    };

    try {
      const res = await axios.patch(`/api/products/${productId}`, productToUpdate);
      console.log(res);
      router.push('/admin/dashboard');
    } catch (error) {
      console.log({ error: error });
    }
  };

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
          <option value="">Seleccione...</option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        {product.category && <p>Opción seleccionada: {product.category}</p>}

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
        <button className="bg-white">Update Product</button>
      </form>
    </div>
  );
}

export default updateProductPage;

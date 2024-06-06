"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

function dashboardPage() {
  const options = ["Posicion trasero", "Plafonier", "Ilumina Patente"];

  const [products , setProducts] = useState([]);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [unit, setUnit] = useState("");

  const router = useRouter();

  const fetchProducts = async () => {
    const res = await axios.get("/api/products");
    setProducts(res.data.products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProduct = {
      name,
      category,
      description,
      unit,
    };

    try {
      const res = await axios.post("/api/products", newProduct);
      fetchProducts();
    } catch (error) {
      console.log({error:error.response.data});
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`/api/products/${id}`);
      console.log(res.data.message);
      fetchProducts();
    } catch (error) {
      console.log(error);
    }
    
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="text-black" id="login-form">
        <h1>Add Product</h1>
        <input
          type="text"
          placeholder="1035a"
          name="name"
          autoComplete="name"
          required={true}
          onChange={(e) => setName(e.target.value)}
        />

        <select
          id="options"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Seleccione...</option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        {category && <p>Opción seleccionada: {category}</p>}

        <input
          type="text"
          placeholder="Excelente prod"
          name="description"
          autoComplete="description"
          required={true}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="text"
          placeholder="12"
          name="unit"
          autoComplete="unit"
          required={true}
          onChange={(e) => setUnit(e.target.value)}
        />
        <button className="bg-white">Add product</button>
      </form>

      <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Categoria</th>
          <th>Descripcion</th>
          <th>Unidad</th>
        </tr>
      </thead>
      <tbody>
        {products.map((prod) => (
          <tr key={prod.productId}>
            <td>{prod.productId}</td>
            <td>{prod.name}</td>
            <td>{prod.category}</td>
            <td>{prod.description}</td>
            <td>{prod.unit}</td>
            <td ><button onClick={() => handleDelete(prod.productId)}>Eliminar</button></td>
            <td><button onClick={() => router.push(`/admin/editProduct/${prod.productId}`)}>Editar</button></td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}

export default dashboardPage;

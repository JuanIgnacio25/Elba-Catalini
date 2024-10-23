"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

function DashboardPage() {
  const options = ["Posicion trasero", "Plafonier", "Ilumina Patente"];

  const [products, setProducts] = useState([]);

  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [unit, setUnit] = useState("");
  const [productSet, setProductSet] = useState("");
  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

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

    const formData = new FormData();
    formData.append("name", name);
    formData.append("sku", sku);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("unit", unit);
    formData.append("productSet", productSet);

    images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      const res = await axios.post("/api/products", formData);

      setName("");
      setSku("");
      setCategory("");
      setDescription("");
      setUnit("");
      setProductSet("");
      setImages([]);
      setImageUrls([]);
    } catch (error) {
      console.error(error.response?.data || error.message);
    } finally {
      fetchProducts();
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);

    const newImageUrls = files.map((file) => URL.createObjectURL(file));
    setImageUrls((prevUrls) => [...prevUrls, ...newImageUrls]);
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`/api/products/${id}`);
      console.log(res.data.message);
      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="text-black" id="login-form">
        <h1>Add Product</h1>
        <input
          type="text"
          placeholder="1035a"
          name="name"
          value={name}
          autoComplete="name"
          required={true}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="sku"
          name="sku"
          value={sku}
          autoComplete="sku"
          required={true}
          onChange={(e) => setSku(e.target.value)}
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

        <textarea
          type="text"
          placeholder="Excelente prod"
          name="description"
          value={description}
          autoComplete="description"
          required={true}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="number"
          placeholder="12"
          name="unit"
          value={unit}
          autoComplete="unit"
          required={true}
          onChange={(e) => setUnit(e.target.value)}
        />
        <input
          type="number"
          placeholder="2"
          name="productSet"
          value={productSet}
          autoComplete="set"
          required={true}
          onChange={(e) => setProductSet(e.target.value)}
        />

        <input type="file" multiple onChange={handleImageChange} />

        <div>
          {imageUrls.length > 0 && (
            <ul>
              {imageUrls.map((url, index) => (
                <li key={index}>
                  <img
                    src={url}
                    alt={`Uploaded image ${index + 1}`}
                    width="200"
                  />
                </li>
              ))}
            </ul>
          )}
        </div>

        <button className="bg-white">Add product</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Sku</th>
            <th>Categoria</th>
            <th>Descripcion</th>
            <th>Unidad</th>
            <th>Juegos</th>
            <th>Imágenes</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod) => (
            <tr key={prod.productId}>
              <td>{prod.productId}</td>
              <td>{prod.name}</td>
              <td>{prod.sku}</td>
              <td>{prod.category}</td>
              <td>{prod.description}</td>
              <td>{prod.unit}</td>
              <td>{prod.productSet}</td>
              <td>
                {prod.images?.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Imagen ${index}`}
                    width={50}
                  />
                ))}
              </td>
              <td>
                <button onClick={() => handleDelete(prod.productId)}>
                  Eliminar
                </button>
              </td>
              <td>
                <button
                  onClick={() =>
                    router.push(`/admin/editProduct/${prod.productId}`)
                  }
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button
          onClick={async () => {
            try {
              const res = await axios.post("/api/products", {
                name: "123",
                description: "hola",
                category: "vllc",
                unit: "12",
                productSet: 2,
              });
              console.log(res);
            } catch (error) {
              console.log(error.response.data);
            }
          }}
        >
          Crear
        </button>
      </div>
    </div>
  );
}

export default DashboardPage;

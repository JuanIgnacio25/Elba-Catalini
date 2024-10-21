import { useState } from "react";
import axios from "axios";

function ProductDetailInfo({ product }) {
  const [quantity, setQuantity] = useState("1");

  const handleAddToCart = async (id) => {
    try {
      await axios.post(`/api/carts/products/${id}`, { quantity });
    } catch (error) {
      if (error.request.status == 401) {
        router.push(
          `/auth/login/?error=para añadir productos al carrito, primero debes iniciar sesion`
        );
      }
      console.log(error.response.data);
    }
  };

  return (
    <div className="product-detail-main-info">
      <h1 className="product-detail-main-info-name">{product.name}</h1>
      <h3 className="product-detail-main-info-sku">SKU: {product.sku}</h3>
      <div className="product-detail-main-info-add">
        <input
          className="product-detail-main-info-add-input"
          name="product-detail-main-info-quantity-input"
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <button
          className="product-detail-main-info-add-button"
          onClick={() => handleAddToCart(product.productId)}
        >
          Añadir al carrito
        </button>
      </div>
      <div className="product-detail-main-info-unit-container">
        <p className="product-detail-main-info-unit">Caja x {product.unit}</p>
      </div>
      <h3 className="product-detail-main-info-description">Descripcion</h3>
      <div className="product-detail-main-info-description-text">
        {product.description}
      </div>
    </div>
  );
}

export default ProductDetailInfo;

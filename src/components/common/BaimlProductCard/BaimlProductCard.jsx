import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios"

import "./baimlProductCard.css"

function ProductCard({ prod }) {
  const router = useRouter();

  const handleAddToCart = async (id) => {
    try {
      await axios.post(`/api/carts/products/${id}`, {});
      
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
    <div className="baiml-p-card">
      <div className="baiml-p-card-img-container">
        <Link href="/" className="baiml-p-card-img-link">
          <Image
            className="baiml-p-card-img"
            src="/1010E.A.jpg"
            alt="Logo-Product"
            width={485}
            height={485}
            priority
          />
        </Link>
      </div>
      <div className="baiml-p-card-info">
        <Link href="/" className="baiml-p-card-info-link">
          <p>{prod.name}</p>
          <p className="baiml-p-card-info-unit">Caja x {prod.unit}</p>
        </Link>
      </div>
      <div className="baiml-p-card-add">
        <input className="baiml-p-card-add-input" type="number" min="1" placeholder="1"/>
        <button className="baiml-p-card-add-button" onClick={() => handleAddToCart(prod.productId)}>
          Añadir al carrito
        </button>
      </div>
    </div>
  );
}

export default ProductCard;

import Link from "next/link";
import Image from "next/image";

function OrderDetailProductCard({ product }) {
  return (
    <tr>
      <td className="order-detail-product-card-img-td">
        <div className="order-detail-product-card-img-container">
          <Link href={`/products/${product.productId}/${!product.slug ? "slug" : product.slug }`} className="order-detail-product-card-img-link">
            <Image
              className="order-detail-product-card-img"
              src={product.images[0].url}
              alt="Logo-Product"
              width={485}
              height={485}
              priority
            />
          </Link>
        </div>
        <p className="order-detail-product-card-product-name">{product.name}</p>
      </td>
      <td className="order-detail-product-card-quantity-td">
        <p className="order-detail-product-card-product-info">
          {product.quantity}
        </p>
      </td>
    </tr>
  );
}

export default OrderDetailProductCard;

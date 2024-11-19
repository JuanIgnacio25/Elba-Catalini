
import SimplifiedViewProductCard from "@/components/views/Products/Baiml/SimplifiedView/SimplifiedViewProductCard";

function SimplifiedViewCards({baimlProducts}) {

  return (
    <div className="simplified-view-cards-container">
      {baimlProducts.map((prod) => {
        return <SimplifiedViewProductCard prod={prod} key={prod.productId} />;
      })}
    </div>
  );
}

export default SimplifiedViewCards;

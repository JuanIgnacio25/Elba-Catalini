function ConfirmOrderDetail({ cart , loading}) {

  if(loading) return <div>Loading...</div>

  return (
    <div className="confirm-order-detail-container">
      <h1 className="confirm-order-detail-title">Resumen del pedido</h1>
      <div className="confirm-order-detail-products-container">
        {cart.products.map((prod) => {
          return (
            <div className="confirm-order-detail-product" key={prod.productId}>
              <p className="confirm-order-detail-product-name">
                {prod.name}
              </p>
              <p className="confirm-order-detail-product-quantity">x{prod.quantity}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ConfirmOrderDetail;

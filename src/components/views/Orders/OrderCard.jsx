function OrderCard({ order , handleRepeat, viewDetail}) {
  return (
    <div className="order-card-container">
      <div className="order-card">
        <div className="order-card-data">
          <p className="order-card-data-num">{`Numero de orden: ${order.orderId}`}</p>
          <p>
            <span className="order-card-data-span">Fecha:</span>
            {` ${new Date(order.createdAt).toLocaleString("es-AR", {
              timeZone: "America/Argentina/Buenos_Aires",
              dateStyle: "short",
            })}`}
          </p>
        </div>
        <div className="order-card-buttons-container">
          <button className="order-card-button" onClick={() => handleRepeat(order.orderId)}>Repetir Pedido</button>
          <button className="order-card-button" onClick={() => viewDetail(order.orderId)}>Ver Detalle</button>
        </div>
      </div>
    </div>
  );
}

export default OrderCard;

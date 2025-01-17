"use client"

function CartCloseOrder({handleCloseOrder}) {

  return (
    <div className="cart-close-container">
      <div className="cart-close">
        <button className="cart-close-button" onClick={handleCloseOrder}>Continuar pedido</button>
      </div>
    </div>
  );
}

export default CartCloseOrder;

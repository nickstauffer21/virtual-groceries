import React, { useContext } from "react";
import { CartContext } from "./CartProvider";

export default function Checkout() {
  const { cart, emptyCart } = useContext(CartContext);

  const checkoutCartElements = cart.map((item) => (
    <div key={item.id} className="checkout-item">
      <img src={item.imageUrl} alt={item.name} />
      <p>{item.name}</p>
      <p>Quantity: {item.quantity}</p>
      <p>Price: ${(item.price * item.quantity).toFixed(2)}</p>
    </div>
  ));
  return (
    <div>
      <h1>Checkout</h1>
      <div>{checkoutCartElements}</div>
    </div>
  );
}

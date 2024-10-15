import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "./CartProvider";

import "./Cart.css";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    emptyCart,
  } = useContext(CartContext);
  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  const handleBuyNow = () => {
    emptyCart();
    alert("Thank you for shopping!");
  };

  const cartElements = cart.map((item) => (
    <div key={item.id} className="cart-item">
      <Link to={`/groceries/${item.id}`}>
        <img src={item.imageUrl} />
        <p className="item-name">{item.name}</p>
        <div>
          <p>${(item.price * item.quantity).toFixed(2)}</p>
        </div>
      </Link>
      <div className="quantity-items">
        <p className="quantity-label">Quantity: {item.quantity}</p>
        <div className="quantity-buttons">
          <button
            className="quantity-button"
            onClick={() => decreaseQuantity(item.id)}
          >
            -
          </button>
          <button
            className="quantity-button"
            onClick={() => increaseQuantity(item.id)}
          >
            +
          </button>
        </div>
        <button
          className="remove-button"
          onClick={() => removeFromCart(item.id)}
        >
          Remove
        </button>
      </div>
    </div>
  ));

  return (
    <div className="cart-page">
      <h1 className="your-cart">Your Cart</h1>
      <div className="cart-content">
        <div className="cart-container">
          {cart.length === 0 ? <div>Cart is empty</div> : cartElements}
        </div>
        <div className="checkout">
          <h2 className="checkout-title">Checkout</h2>
          <p>Total: ${calculateTotal().toFixed(2)}</p>
          <Link to="/checkout">
            <button>Buy now</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

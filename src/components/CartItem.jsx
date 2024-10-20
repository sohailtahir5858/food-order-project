import React, { useContext } from "react";
import CartContext from "../store/CartContext";

function CartItem({ item }) {
  const cartCtx = useContext(CartContext);
  function handleRemoveItem(id) {
    cartCtx.removeItem(id);
  }

  function handleAddItem(item) {
    cartCtx.addItem(item);
  }
  return (
    <li className="cart-item">
      <p>
        {item.name} - {item.quantity} * {item.price}
      </p>
      <p className="cart-item-actions">
        <button onClick={() => handleRemoveItem(item.id)}>-</button>
        <span>{item.quantity}</span>
        <button onClick={() => handleAddItem(item)}>+</button>
      </p>
    </li>
  );
}

export default CartItem;

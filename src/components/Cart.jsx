import React, { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import CartItem from "./CartItem";
function Cart() {
  const cartCtx = useContext(CartContext);
  const progressCtx = useContext(UserProgressContext);

  function handleProgressClose() {
    progressCtx.hideCart();
  }

  function handleGoToCheckout() {
    progressCtx.showCheckout();
  }

  const cartTotal = cartCtx.items.reduce((totalAmount, item) => {
    return (totalAmount += item.price * item.quantity);
  }, 0);
  return (
    <Modal
      className="cart"
      open={progressCtx.progress === "cart"}
      onClose={progressCtx.progress === "cart" ? handleProgressClose : null}
    >
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </ul>

      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button textOnly={true} onClick={handleProgressClose}>
          Close
        </Button>
        {cartCtx.items.length > 0 && (
          <Button textOnly={false} onClick={handleGoToCheckout}>
            Got to Checkout
          </Button>
        )}
      </p>
    </Modal>
  );
}

export default Cart;

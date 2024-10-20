import React, { useContext } from "react";
import Modal from "./UI/Modal";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";
import Input from "./UI/Input";
import UserProgressContext from "../store/UserProgressContext";

function Checkout() {
  const cartCtx = useContext(CartContext);
  const progressCtx = useContext(UserProgressContext);
  const totalAmount = cartCtx.items.reduce((totalAmount, item) => {
    return (totalAmount += item.quantity * item.price);
  }, 0);

  function handleCheckoutClose() {
    progressCtx.hideCheckout();
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const id = new FormData(event.target);
    const customerData = Object.fromEntries(id.entries());
    const result = await fetch("http://localhost:3000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      }),
    });

    const response = await result.json();
    if(result.ok){
      progressCtx.hideCheckout()
      
      cartCtx.removeItem()
    }
  }
  return (
    <Modal
      open={progressCtx.progress === "checkout"}
      onClose={handleCheckoutClose}
    >
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: {totalAmount}</p>
        <Input label="Full Name" type="text" id="name" />
        <Input label="E-mail address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>

        <p className="modal-actions">
          <Button textOnly type="button" onClick={handleCheckoutClose}>
            Close
          </Button>

          <Button>Submit Order</Button>
        </p>
      </form>
    </Modal>
  );
}

export default Checkout;

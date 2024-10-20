import React, { useContext } from "react";
import Modal from "./UI/Modal";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";
import Input from "./UI/Input";
import UserProgressContext from "../store/UserProgressContext";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};
function Checkout() {
  const cartCtx = useContext(CartContext);
  const progressCtx = useContext(UserProgressContext);
  const totalAmount = cartCtx.items.reduce((totalAmount, item) => {
    return (totalAmount += item.quantity * item.price);
  }, 0);

  const { data, isLoading, error, sendRequest, clearData } = useHttp(
    "http://localhost:3000/orders",
    requestConfig,
    []
  );

  function handleCheckoutClose() {
    progressCtx.hideCheckout();
  }

  function handleFinish() {
    progressCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
  }

  let actions = (
    <>
      <Button textOnly type="button" onClick={handleCheckoutClose}>
        Close
      </Button>

      <Button>Submit Order</Button>
    </>
  );

  async function handleSubmit(e) {
    e.preventDefault();
    const id = new FormData(event.target);
    const customerData = Object.fromEntries(id.entries());

    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      })
    );

    if (isLoading) {
      actions = <span>Sending Data</span>;
    }
  }
  if (data.message && !error) {
    return (
      <Modal open={progressCtx.progress === "checkout"} onClose={handleFinish}>
        <h2>Order submitted successfully</h2>
        <p>Thank you. please visit again</p>
        <Button onClick={handleFinish}>Close</Button>
      </Modal>
    );
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
        {error && <Error title="failed to submit order" message={error} />}
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}

export default Checkout;

import React, { useContext } from "react";
import logoImg from "../assets/logo.jpg";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
function Header() {
  const cartCtx = useContext(CartContext);
  const progressCtx = useContext(UserProgressContext);

  function handleProgress() {
    progressCtx.showCart();
  }

  // this method will go through all items, while keeping the count of items, it will add the quantity one by one
  const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);
  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="" />
        <h1>FoodiesWeb</h1>
      </div>
      <nav>
        <Button onClick={handleProgress} textOnly={true}>Cart ({totalCartItems})</Button>
      </nav>
    </header>
  );
}

export default Header;

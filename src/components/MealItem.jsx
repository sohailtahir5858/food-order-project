import React, { useContext } from "react";
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";

function MealItem({ meal }) {
  const cartctx = useContext(CartContext);
  function handleAddMealItem() {
    cartctx.addItem(meal);
  }
  return (
    <li key={meal.id} className="meal-item">
      <article>
        <img src={`http://localhost:3000/${meal.image}`} alt="meal-image" />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">
            {currencyFormatter.format(meal.price)}
          </p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p>
          <Button
            onClick={handleAddMealItem}
            className="meal-item-actions"
            textOnly={false}
          >
            Add to Card
          </Button>
        </p>
      </article>
    </li>
  );
}

export default MealItem;

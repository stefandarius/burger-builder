import React from "react";
import Auxiliary from "../../../hoc/Auxiliary";
import Button from "../../UI/Button/Button";

const orderSummary = props => {
  const ingredientSummary = Object.keys(props.ingredients).map(igKey => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: "capitalize" }}>{igKey}</span>:{" "}
        {props.ingredients[igKey]}
      </li>
    );
  });
  return (
    <Auxiliary>
      <h3>Your Order!</h3>
      <p>This burger contains the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>Price: <strong>{props.price.toFixed(2)} $</strong></p>
      <p>Continue to Checkout?</p>
      <Button clicked={props.canceled} buttonType="Danger">
        CANCEL
      </Button>
      <Button clicked={props.succeed} buttonType="Success">
        CONTINUE
      </Button>
    </Auxiliary>
  );
};

export default orderSummary;

import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Meat", type: "meat" },
  { label: "Cheese", type: "cheese" }
];

const buildControls = props => (
  <div className={classes.BuildControls}>
    <p>
      Total price: <strong>{props.price.toFixed(2)} $</strong>
    </p>
    {controls.map(ctrl => (
      <BuildControl
        key={ctrl.label}
        label={ctrl.label}
        added={() => props.ingredientAdded(ctrl.type)}
        removed={() => props.ingredientRemoved(ctrl.type)}
        disabled={props.disabled[ctrl.type]}
        number={props.number[ctrl.type]}
        individualPrice={props.individualPrice[ctrl.type].toFixed(2)}
      />
    ))}
    <button
      className={classes.OrderButton}
      disabled={!props.orderDisabled}
      onClick={props.purchasing}
    >
      ORDER NOW
    </button>
  </div>
);

export default buildControls;

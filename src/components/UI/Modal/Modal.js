import React from "react";
import classes from "./Modal.module.css";
import Auxiliary from "../../../hoc/Auxiliary";
import Backdrop from "../Backdrop/Backdrop";

const modal = props => (
  <Auxiliary>
    <Backdrop show={props.show} clicked={props.closed} />
    <div
      className={classes.Modal}
      style={{
        transform: props.show ? "translateY(-5vh)" : "translateY(-100vh)",
        opacity: props.show ? "1" : "0"
      }}
    >
      {props.children}
    </div>
  </Auxiliary>
);

export default modal;

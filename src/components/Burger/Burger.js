import React from 'react';
import classes from './Burger.module.css';
import Ingredient from './Ingredients/Ingredient';

const burger = (props) => {
  return (
    <div className = {classes.Burger}>
      <Ingredient type="bread-top" />
      <Ingredient type="bacon" />
      <Ingredient type="salad" />
      <Ingredient type="cheese" />
      <Ingredient type="meat" />
      <Ingredient type="bread-bottom" />
    </div>
  );
};

export default burger;

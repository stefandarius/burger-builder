import React from 'react';
import classes from './Ingredient.module.css';
import PropTyes from 'prop-types';

const Ingredient = props => {
    let ingr = null;

    switch (props.type) {
      case ('bread-bottom'):
        ingr = <div className = {classes.BreadBottom}></div>
        break;
      case ('bread-top'):
        ingr = (
          <div className = {classes.BreadTop}>
            <div className = {classes.Seeds1}></div>
            <div className = {classes.Seeds2}></div>
          </div>
        )
        break;
      case ('meat'):
        ingr = <div className = {classes.Meat}></div>
        break;
      case ('cheese'):
        ingr = <div className = {classes.Cheese}></div>
        break;
      case ('salad'):
        ingr = <div className = {classes.Salad}></div>
        break;
      case ('bacon'):
        ingr = <div className = {classes.Bacon}></div>
        break;
      default:
        ingr = null;
    }

    return ingr;
};

Ingredient.propTyes = {
  type: PropTyes.string.isRequired
};

export default Ingredient;

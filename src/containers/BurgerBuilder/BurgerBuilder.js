import React, { Component } from "react";
import Auxiliary from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

const INGREDIENT_PRICE = {
  salad: 0.3,
  cheese: 0.5,
  bacon: 0.5,
  meat: 1
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4
  };

  addIngredientHandler = type => {
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = this.state.ingredients[type] + 1;
    const newPrice = this.state.totalPrice + INGREDIENT_PRICE[type];
    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
  };

  removeIngredientHandler = type => {
    if (this.state.ingredients[type] > 0) {
      const updatedCount = this.state.ingredients[type] - 1;
      const updatedIngredients = {
        ...this.state.ingredients
      };
      updatedIngredients[type] = updatedCount;
      const newPrice = this.state.totalPrice - INGREDIENT_PRICE[type];
      this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
    }
  };

  render() {

    const disabledInfo = {
      ...this.state.ingredients
    }
    for(let key in disabledInfo) {
      disabledInfo[key] = (disabledInfo[key] === 0);
    }

    return (
      <Auxiliary>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls  
          ingredientAdded = {this.addIngredientHandler}
          ingredientRemoved = {this.removeIngredientHandler}
          disabled = {disabledInfo}
          number = {this.state.ingredients}
          price = {this.state.totalPrice} />
      </Auxiliary>
    );
  }
}

export default BurgerBuilder;

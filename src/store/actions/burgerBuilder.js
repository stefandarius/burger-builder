import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (name) => ({
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name
});

export const removeIngredient = (name) => ({
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name
});

export const setIngredients = (ingredients) => ({
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients
});

export const setIngredientsFailed = () => ({
    type: actionTypes.FETCH_INGREDIENTS_FAILED
});

export const initIngredients = () => dispatch => {
    axios.get("https://react-burger-builder-41d09.firebaseio.com/ingredients.json")
        .then(response => {
            dispatch(setIngredients(response.data));
        })
        .catch(error => {
            dispatch(setIngredientsFailed());
    })
};
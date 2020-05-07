import React, {useState, useEffect} from "react";
import { connect } from "react-redux";
import axios from '../../axios-orders';
import Auxiliary from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as burgerBuilderActions from "../../store/actions/index";

const INGREDIENT_PRICE = {
    salad: 0.3,
    cheese: 0.5,
    bacon: 0.5,
    meat: 1
};

const BurgerBuilder = props => {

    const [purchasing, setPurchasing] = useState(false);

    useEffect(() => {
        props.onInitIngredients();
    }, []);

    const updatePurchaseState = ingredients => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    };

    const purchaseHandler = () => {
        if(props.isAuth)
            setPurchasing(true);
        else{
            props.onSetRedirectPath('/checkout');
            props.history.push('/auth');
        }
    };

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    };

    const purchaseContinueHandler = () => {
        props.onInitPurchase();
        props.history.push('/checkout');
    };


        const disabledInfo = {
            ...props.ings
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] === 0;
        }

        let orderSummary = null;
        let burger = props.error ? <p>Ingredients can't be loaded</p> : <Spinner/>;

        if (props.ings) {
            burger = (
                <Auxiliary>
                    <Burger ingredients={props.ings}/>
                    <BuildControls
                        ingredientAdded={props.onIngredientAdded}
                        ingredientRemoved={props.onIngredientRemoved}
                        disabled={disabledInfo}
                        orderDisabled={updatePurchaseState(props.ings)}
                        number={props.ings}
                        price={props.price}
                        purchasing={purchaseHandler}
                        individualPrice={INGREDIENT_PRICE}
                        isAuth={props.isAuth}
                    />
                </Auxiliary>
            );

            orderSummary = (
                <OrderSummary
                    ingredients={props.ings}
                    canceled={purchaseCancelHandler}
                    succeed={purchaseContinueHandler}
                    price={props.price}
                />
            );
        }

        return (
            <Auxiliary>
                <Modal show={purchasing} closed={purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxiliary>
        );

};

const mapStateToProps = state => ({
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuth: state.authReducer.token !== null
});

const mapDispatchToProps = dispatch => ({
    onIngredientAdded: (name) => dispatch(burgerBuilderActions.addIngredient(name)),
    onIngredientRemoved: (name) => dispatch(burgerBuilderActions.removeIngredient(name)),
    onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
    onInitPurchase: () => dispatch(burgerBuilderActions.purchaseInit()),
    onSetRedirectPath: (path) => dispatch(burgerBuilderActions.setAuthRedirectPath(path)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));

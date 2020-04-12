import React, {Component} from "react";
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
import {initIngredients} from "../../store/actions/index";

const INGREDIENT_PRICE = {
    salad: 0.3,
    cheese: 0.5,
    bacon: 0.5,
    meat: 1
};

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
    };

    componentDidMount() {
        this.props.onInitIngredients();
    }

    updatePurchaseState = ingredients => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    };

    purchaseHandler = () => {
        if(this.props.isAuth)
            this.setState({purchasing: true});
        else{
            this.props.onSetRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    };

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    };

    render() {
        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] === 0;
        }

        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner/>;

        if (this.props.ings) {
            burger = (
                <Auxiliary>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        orderDisabled={this.updatePurchaseState(this.props.ings)}
                        number={this.props.ings}
                        price={this.props.price}
                        purchasing={this.purchaseHandler}
                        individualPrice={INGREDIENT_PRICE}
                        isAuth={this.props.isAuth}
                    />
                </Auxiliary>
            );

            orderSummary = (
                <OrderSummary
                    ingredients={this.props.ings}
                    canceled={this.purchaseCancelHandler}
                    succeed={this.purchaseContinueHandler}
                    price={this.props.price}
                />
            );
        }

        return (
            <Auxiliary>
                <Modal show={this.state.purchasing} closed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxiliary>
        );
    }
}

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

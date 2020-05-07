import React, {useState} from 'react';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux';
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as orderActions from '../../../store/actions/index';

const ContactData = props => {

    const [orderForm, setOrderForm] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Name'
            },
            value: ''
        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Street'
            },
            value: ''
        },
        number: {
            elementType: 'input',
            elementConfig: {
                type: 'number',
                placeholder: 'Street number'
            },
            value: ''
        },
        zip: {
            elementType: 'input',
            elementConfig: {
                type: 'number',
                placeholder: 'ZIP code'
            },
            value: ''
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Email'
            },
            value: ''
        },
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {
                options: [{value: 'fastest', displayValue: 'Fastest'}, {value: 'cheapest', displayValue: "Cheapest"}]
            },
            value: ''
        },
    });

    const orderHandler = (event) => {
        event.preventDefault();

        const formData = {};
        for (let formElementIdentifier in orderForm) {
            formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: props.ings,
            price: props.price,
            customer: formData,
            userId: props.userId,
        };

        props.onPurchaseStart(order, props.token);
    };

    const onChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {...orderForm};
        const updatedFormElement = {...updatedOrderForm[inputIdentifier]};
        updatedFormElement.value = event.target.value;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        setOrderForm(updatedOrderForm);
    };

    const formElementsArray = [];
    for (let key in orderForm) {
        formElementsArray.push({
            id: key,
            config: orderForm[key]
        })
    }

    let form = (
        <form>
            {formElementsArray.map(formElement => (
                <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    change={(event) => onChangedHandler(event, formElement.id)}
                />
            ))}
            <button className={classes.Button} onClick={orderHandler}>ORDER</button>
        </form>
    );

    if (props.loading) {
        form = <Spinner/>
    }

    return (
        <div className={classes.ContactData}>
            <h4>Enter your contact data:</h4>
            {form}
        </div>
    );
}

const mapStateToProps = state => ({
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.orderReducer.loading,
    purchased: state.orderReducer.purchased,
    token: state.authReducer.token,
    userId: state.authReducer.userId,
});

const mapDispatchToProps = dispatch => ({
    onPurchaseStart: (orderData, token) => dispatch(orderActions.purchaseBurger(orderData, token))
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
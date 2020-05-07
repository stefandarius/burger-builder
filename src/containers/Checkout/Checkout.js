import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from "./ContactData/ContactData";
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import {Route, Redirect} from 'react-router-dom';

const Checkout = props => {

    const checkoutCanceledHandler = () => {
        props.history.goBack();
    };

    const checkoutContinuedHandler = () => {
        props.history.replace('/checkout/contact-data');
    };

    let summary = <Redirect to={'/'} from={'/checkout'}/>;
    if (props.ings) {
        const purchaseRedirect = props.pur ? (<Redirect to={'/'} from={'/checkout'}/>) : null;
        console.log("Purchased", purchaseRedirect);
        summary = (
            <div>
                {purchaseRedirect}
                <CheckoutSummary
                    ingredients={props.ings}
                    checkoutCanceled={checkoutCanceledHandler}
                    checkoutContinued={checkoutContinuedHandler}
                />
                <Route
                    path={props.match.path + '/contact-data'}
                    component={ContactData}/>
            </div>);
    }
    return summary;

};

const mapStateToProps = state => ({
    ings: state.burgerBuilder.ingredients,
    pur: state.orderReducer.purchased
});

export default connect(mapStateToProps)(Checkout);
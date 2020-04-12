import React, {Component} from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import {Redirect, Route, Switch, withRouter} from 'react-router-dom';
import Logout from "./containers/Auth/Logout/Logout";
import {connect} from "react-redux";
import * as actions from './store/actions/index';
import asyncComponent from "./hoc/asyncComponent/asyncComponent";

const asyncCheckout = asyncComponent(() => {
    return import("./containers/Checkout/Checkout");
});

const asyncOrders = asyncComponent(() => {
    return import('./containers/Orders/Orders');
});

const asyncAuth = asyncComponent(() => {
    return import('./containers/Auth/Auth');
});

class App extends Component {

    componentDidMount() {
        this.props.onTryAutoSignIn();
    }

    render() {

        let routes = (
            <Switch>
                <Route path='/auth' component={asyncAuth} />
                <Route path="/" exact component={BurgerBuilder}/>
                <Redirect to={"/"} from={"/"}/>
            </Switch>
        );

        if(this.props.isAuth) {
            routes = (
                <Switch>
                    <Route path='/orders' component={asyncOrders} />
                    <Route path='/logout' component={Logout} />
                    <Route path="/checkout" component={asyncCheckout}/>
                    <Route path='/auth' component={asyncAuth} />
                    <Route path="/" exact component={BurgerBuilder}/>
                    <Redirect to={"/"} from={"/"}/>
                </Switch>
            );
        }

        return (
            <div>
                <Layout>
                    {routes}
                </Layout>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuth: state.authReducer.token !== null
});

const mapDispatchToProps = dispatch => ({
    onTryAutoSignIn: () => dispatch(actions.authCheckState())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

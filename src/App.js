import React, {useEffect, Suspense} from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import {Redirect, Route, Switch, withRouter} from 'react-router-dom';
import Logout from "./containers/Auth/Logout/Logout";
import {connect} from "react-redux";
import * as actions from './store/actions/index';
import Spinner from "./components/UI/Spinner/Spinner";

const Checkout = React.lazy(() => {
    return import("./containers/Checkout/Checkout");
});

const Orders = React.lazy(() => {
    return import('./containers/Orders/Orders');
});

const Auth = React.lazy(() => {
    return import('./containers/Auth/Auth');
});

const App = props => {

    useEffect(() => {
        props.onTryAutoSignIn();
    }, []);

    let routes = (
        <Switch>
            <Route path='/auth' render={(props) => <Auth {...props} />}/>
            <Route path="/" exact component={BurgerBuilder}/>
            <Redirect to={"/"} from={"/"}/>
        </Switch>
    );

    if (props.isAuth) {
        routes = (
            <Switch>
                <Route path='/orders' render={(props) => <Orders {...props} />}/>
                <Route path='/logout' component={Logout}/>
                <Route path="/checkout" render={(props) => <Checkout {...props} />}/>
                <Route path='/auth' render={(props) => <Auth {...props} />}/>
                <Route path="/" exact component={BurgerBuilder}/>
                <Redirect to={"/"} from={"/"}/>
            </Switch>
        );
    }

    return (
        <div>
            <Layout>
                <Suspense fallback={<Spinner/>}>
                    {routes}
                </Suspense>
            </Layout>
        </div>
    );
};

const mapStateToProps = state => ({
    isAuth: state.authReducer.token !== null
});

const mapDispatchToProps = dispatch => ({
    onTryAutoSignIn: () => dispatch(actions.authCheckState())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

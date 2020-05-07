import React, {useState, useEffect} from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import {Redirect} from "react-router-dom";

const Auth = props => {

    const [controls, setControls] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Email'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        }
    });
    const [isSignUp, setIsSignUp] = useState(true);

    useEffect(() => {
        if (!props.building && props.authRedirect !== '/') {
            props.onSetAuthRedirectPath();
        }
    }, []);

    const onChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {...controls};
        const updatedFormElement = {...updatedOrderForm[inputIdentifier]};
        updatedFormElement.value = event.target.value;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        setControls(updatedOrderForm);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        props.onAuth(controls.email.value, controls.password.value, isSignUp);
    };

    const switchAuthMode = () => {
        setIsSignUp(!isSignUp);
    };

    const formElementsArray = [];
    for (let key in controls) {
        formElementsArray.push({
            id: key,
            config: controls[key]
        })
    }

    let form = formElementsArray.map(formElement => (
        <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            change={(event) => onChangedHandler(event, formElement.id)}
        />
    ));

    if (props.loading) {
        form = <Spinner/>;
    }

    let errorMessage = null;

    if (props.error) {
        errorMessage = <p>{props.error.message}</p>;
    }

    return (
        <div className={classes.Auth}>
            {props.isAuth ? <Redirect to={props.authRedirect}/> : null}
            <h1>LOGIN</h1>
            <form>
                {form}
                <button className={classes.Btn} onClick={submitHandler}>SUBMIT</button>
            </form>
            <Button clicked={switchAuthMode} buttonType={"Danger"}>SWITCH
                TO {isSignUp ? "SIGN IN" : "SIGN UP"}</Button>
            {errorMessage}
        </div>
    );
};

const mapStateToProps = state => ({
    loading: state.authReducer.loading,
    error: state.authReducer.error,
    isAuth: state.authReducer.token !== null,
    building: state.burgerBuilder.building,
    authRedirect: state.authReducer.authRedirect,
});

const mapDispatchToProps = dispatch => ({
    onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
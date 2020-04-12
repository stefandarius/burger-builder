import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import {Redirect} from "react-router-dom";

class Auth extends Component {

    state = {
        controls: {
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
        },
        isSignUp: true
    };

    componentDidMount () {
        if(!this.props.building && this.props.authRedirect !== '/') {
            this.props.onSetAuthRedirectPath();
        }
    }

    onChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {...this.state.controls};
        const updatedFormElement = {...updatedOrderForm[inputIdentifier]};
        updatedFormElement.value = event.target.value;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        this.setState({controls: updatedOrderForm});
    };

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
    };

    switchAuthMode = () => {
        this.setState(prevState => ({
            isSignUp: !prevState.isSignUp
        }));
    };

    render () {

        const formElementsArray = [];
        for(let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        let form = formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                change={(event) => this.onChangedHandler(event, formElement.id)}
            />
        ));

        if(this.props.loading) {
            form = <Spinner />;
        }

        let errorMessage = null;

        if(this.props.error) {
            errorMessage = <p>{this.props.error.message}</p>;
        }

        return (
            <div className={classes.Auth}>
                {this.props.isAuth ? <Redirect to={this.props.authRedirect}/> : null}
                <h1>LOGIN</h1>
                <form>
                    {form}
                    <button className={classes.Btn} onClick={this.submitHandler}>SUBMIT</button>
                </form>
                <Button clicked={this.switchAuthMode} buttonType={"Danger"}>SWITCH TO {this.state.isSignUp ? "SIGN IN" : "SIGN UP"}</Button>
                {errorMessage}
            </div>
        );
    }
}

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
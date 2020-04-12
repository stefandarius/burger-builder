import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => ({
    type: actionTypes.AUTH_START
});

export const authSuccess = (token, userId) => ({
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    userId: userId
});

export const authFailed = (error) => ({
    type: actionTypes.AUTH_FAILED,
    error: error
});

export const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.LOGOUT
    }
};

export const checkAuthTimeout = expirationTime => dispatch => {
    setTimeout(() => {
        dispatch(logOut());
    }, expirationTime * 1000);
};

export const auth = (email, password, isSignUp) => dispatch => {
    dispatch(authStart());
    const authData = {
        email: email,
        password: password,
        returnSecureToken: true
    };
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBno0up79ioiOFLBhCdBgHR4jyP8ilkVg0';
    if (isSignUp)
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBno0up79ioiOFLBhCdBgHR4jyP8ilkVg0';
    axios.post(url, authData)
        .then(response => {
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('userId', response.data.localId);
            dispatch(authSuccess(response.data.idToken, response.data.localId));
            dispatch(checkAuthTimeout(response.data.expiresIn));
        })
        .catch(error => {
            console.error(error);
            dispatch(authFailed(error.response.data.error));
        })
};

export const setAuthRedirectPath = path => ({
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
});

export const authCheckState = () => dispatch => {
    const token = localStorage.getItem('token');
    if(!token) {
        dispatch(logOut());
    } else {
        const expirationDate = new Date(localStorage.getItem('expirationDate'));
        const userId = localStorage.getItem('userId');
        if(new Date() < expirationDate) {
            dispatch(authSuccess(token, userId));
            dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000));
        } else {
            dispatch(logOut());
        }
    }
};
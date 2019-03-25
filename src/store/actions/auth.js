import axios from 'axios';
import actionTypes from './actionTypes';

const { AUTH_START, AUTH_SUCCESS, AUTH_FAIL, AUTH_LOGOUT } = actionTypes;
const apiKey = process.env.REACT_APP_FIREBASE_API_KEY;
const signUpUrl = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${apiKey}`;
const logInUrl = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${apiKey}`;

const authSuccess = (idToken, userId) => {
    return {
        type: AUTH_SUCCESS,
        idToken,
        userId
    }
};

const authFail = (error) => {
    return {
        type: AUTH_FAIL,
        error
    }
};

const authStart = () => {
    return {
        type: AUTH_START
    }
};

export const auth = (authData, signUpMode) => {
    return async (dispatch) => {
        dispatch(authStart());
        try {
            const url = signUpMode ? signUpUrl : logInUrl;
            const response = await axios.post(url, authData);
            const { idToken, localId } = response.data;
            dispatch(authSuccess(idToken, localId));
            dispatch(checkTokenTimeout(response.data.expiresIn));
        } catch(err) {
            dispatch(authFail(err.response.data.error));
        }
    }
};

export const logout = () => {
    return {
        type: AUTH_LOGOUT
    };
};

export const checkTokenTimeout = (expiration) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(logout());
        }, expiration * 1000);
    }
};
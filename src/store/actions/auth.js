import axios from 'axios';
import actionTypes from './actionTypes';

const { AUTH_START, AUTH_SUCCESS, AUTH_FAIL, AUTH_LOGOUT, SET_AUTH_REDIRECT_PATH } = actionTypes;
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
            const { idToken, localId, expiresIn } = response.data;

            // Save token and expiration date in localstorage
            const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
            localStorage.setItem('token', idToken);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('localId', localId);

            // Dispatch success actions
            dispatch(authSuccess(idToken, localId));
            dispatch(checkTokenTimeout(expiresIn));
        } catch(err) {
            dispatch(authFail(err.response.data.error));
        }
    }
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('localId');
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

export const setRedirectPath = (path) => ({
  type: SET_AUTH_REDIRECT_PATH,
  path
})

export const checkAuthState = () => {
    return (dispatch) => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate > new Date()) {
                const userId = localStorage.getItem('localId');
                const expirationTime = (expirationDate.getTime()  - new Date().getTime()) / 1000;
                dispatch(authSuccess(token, userId));
                dispatch(checkTokenTimeout(expirationTime));
            } else {
                dispatch(logout());
            }
        }
    };
};
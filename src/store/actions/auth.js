import axios from 'axios';
import actionTypes from './actionTypes';

const { AUTH_START, AUTH_SUCCESS, AUTH_FAIL } = actionTypes;
const apiKey = process.env.REACT_APP_FIREBASE_API_KEY;
const signUpUrl = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${apiKey}`;
const logInUrl = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${apiKey}`;

const authSuccess = (data) => {
    return {
        type: AUTH_SUCCESS
    }
};

const authFail = () => {
    return {
        type: AUTH_FAIL
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
            console.log(response);
            dispatch(authSuccess(response.data));
        } catch(err) {
            console.log(err);
            dispatch(authFail());
        }
    }
};

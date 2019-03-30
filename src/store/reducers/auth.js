import actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const { AUTH_START, AUTH_SUCCESS, AUTH_FAIL, AUTH_LOGOUT, SET_AUTH_REDIRECT_PATH } = actionTypes;

export const initialState = {
    idToken: null,
    userId: null,
    error: null,
    loading: null,
    authRedirectPath: '/',
}

const reducer = (state = initialState, action) => {
    const { type, idToken, userId, error, path } = action;

    switch(type) {
        case AUTH_START:
            return updateObject(state, {error: null, loading: true});
        case AUTH_SUCCESS:
            return updateObject(state, {idToken, userId, error: null, loading: false});
        case AUTH_FAIL:
            return updateObject(state, {error, loading: false});
        case AUTH_LOGOUT:
            return updateObject(state, {idToken: null, userId: null});
        case SET_AUTH_REDIRECT_PATH:
            return updateObject(state, {authRedirectPath: path});
        default:
            return state;
    }
}

export default reducer;
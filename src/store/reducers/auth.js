import actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const { AUTH_START, AUTH_SUCCESS, AUTH_FAIL, AUTH_LOGOUT } = actionTypes;

const initialState = {
    idToken: null,
    userId: null,
    error: null,
    loading: null,
}

const reducer = (state = initialState, action) => {
    const { type, idToken, userId, error } = action;

    switch(type) {
        case AUTH_START:
            return updateObject(state, {error: null, loading: true});
        case AUTH_SUCCESS:
            return updateObject(state, {idToken, userId, error: null, loading: false});
        case AUTH_FAIL:
            return updateObject(state, {error, loading: false});
        case AUTH_LOGOUT:
            return updateObject(state, {idToken: null, userId: null});
        default:
            return state;
    }
}

export default reducer;
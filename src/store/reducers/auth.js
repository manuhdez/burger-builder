import actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const { AUTH_START, AUTH_SUCCESS, AUTH_FAIL} = actionTypes;

const initialState = {
    token: null,
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
        default:
            return state;
    }
}

export default reducer;
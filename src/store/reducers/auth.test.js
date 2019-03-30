import reducer, { initialState } from './auth';
import actionTypes from '../actions/actionTypes';
const { AUTH_SUCCESS, AUTH_LOGOUT } = actionTypes;

describe('auth reducer', () => {
    let action;
    beforeEach(() => {
        action = {};
    });

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('should store the token and user id upon successful login', () => {
        action = {
            type: AUTH_SUCCESS,
            idToken: 'token-value',
            userId: 'user-value',
        };
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            idToken: 'token-value',
            userId: 'user-value',
            loading: false
        });
    });

    it('should remove the token and user id from the state when a user logs out', () => {
        action = {
            type: AUTH_LOGOUT
        };
        const loggedState = {
            ...initialState,
            idToken: 'token-value',
            userId: 'user-value',
        }
        expect(reducer(loggedState, action)).toEqual({
            ...loggedState,
            idToken: null,
            userId: null,
        });
    });
});
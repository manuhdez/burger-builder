import actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const {
    PURCHASE_INIT,
    PURCHASE_BURGUER_START,
    PURCHASE_BURGUER_SUCCESS,
    PURCHASE_BURGUER_FAIL,
    FETCH_ORDERS_START,
    FETCH_ORDERS_SUCCESS,
    FETCH_ORDERS_FAIL
} = actionTypes;

const initialState = {
    orders: [],
    loading: false,
    purchased: false
};

export default (state = initialState, action) => {
    const { type, orderId, orderData, orders } = action;

    switch(type) {
        case PURCHASE_INIT:
            return updateObject(state, { purchased: false });
        case PURCHASE_BURGUER_START:
            return updateObject(state, { loading: true });
        case PURCHASE_BURGUER_SUCCESS:
            const newOrder = { id: orderId, ...orderData };
            const updatedValues = { loading: false, purchased: true, orders: state.orders.concat(newOrder) };
            return updateObject(state, updatedValues);
        case PURCHASE_BURGUER_FAIL:
            return updateObject(state, { loading: false });
        case FETCH_ORDERS_START:
            return updateObject(state, { loading: true });
        case FETCH_ORDERS_SUCCESS:
            return updateObject(state, { orders, loading: false });
        case FETCH_ORDERS_FAIL:
            return updateObject(state, { loading: false });
        default:
            return state;
    }
};

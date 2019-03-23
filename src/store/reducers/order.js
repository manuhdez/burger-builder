import actionTypes from '../actions/actionTypes';
const { PURCHASE_BURGUER_START, PURCHASE_BURGUER_SUCCESS, PURCHASE_BURGUER_FAIL } = actionTypes;

const initialState = {
    orders: [],
    loading: false,
};

export default (state = initialState, action) => {
    const { type, orderId, orderData } = action;

    switch(type) {
        case PURCHASE_BURGUER_START:
            return {
                ...state,
                loading: true
            }
        case PURCHASE_BURGUER_SUCCESS:
            const newOrder = { id: orderId, ...orderData};
            return {
                ...state,
                loading: false,
                orders: state.orders.concat(newOrder)
            }
        case PURCHASE_BURGUER_FAIL:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
};

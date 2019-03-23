import actionTypes from './actionTypes';
import axios from '../../axios-orders';

const { PURCHASE_BURGUER_SUCCESS, PURCHASE_BURGUER_FAIL } = actionTypes;

const purchaseBurguerSuccess = (orderId, orderData) => {
    return {
        type: PURCHASE_BURGUER_SUCCESS,
        orderId,
        orderData
    };
};

const purchaseBurguerFail = (error) => {
    return {
        type: PURCHASE_BURGUER_FAIL,
        error
    };
};

export const purchaseBurguerStart = (orderData) => {
    return async (dispatch) => {
        try {
            const response = await axios.post('/orders.json', orderData);
            dispatch(purchaseBurguerSuccess(response.data, orderData));
        } catch(err) {
            dispatch(purchaseBurguerFail(err));
        }
    }
};
import actionTypes from './actionTypes';
import axios from '../../axios-orders';

const { PURCHASE_INIT, PURCHASE_BURGUER_START, PURCHASE_BURGUER_SUCCESS, PURCHASE_BURGUER_FAIL } = actionTypes;

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

const purchaseBurguerStart = () => {
    return {
        type: PURCHASE_BURGUER_START
    };
};

export const purchaseInit = () => {
    return {
        type: PURCHASE_INIT
    };
};

export const purchaseBurguer = (orderData) => {
    return async (dispatch) => {
        dispatch(purchaseBurguerStart());
        try {
            const response = await axios.post('/orders.json', orderData);
            dispatch(purchaseBurguerSuccess(response.data.name, orderData));
        } catch(err) {
            dispatch(purchaseBurguerFail(err));
        }
    };
};
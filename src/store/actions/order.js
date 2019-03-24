import actionTypes from './actionTypes';
import axios from '../../axios-orders';

const {
    PURCHASE_INIT,
    PURCHASE_BURGUER_START,
    PURCHASE_BURGUER_SUCCESS,
    PURCHASE_BURGUER_FAIL,
    FETCH_ORDERS_START,
    FETCH_ORDERS_SUCCESS,
    FETCH_ORDERS_FAIL
} = actionTypes;

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

// Orders page actions
const fetchOrdersSuccess = (orders) => {
    return {
        type: FETCH_ORDERS_SUCCESS,
        orders
    };
};

const fetchOrdersFail = (error) => {
    return {
        type: FETCH_ORDERS_FAIL,
        error
    };
};

const fetchOrdersStart = () => {
    return {
        type: FETCH_ORDERS_START
    };
};

export const fetchOrders = () => {
    return async (dispatch) => {
        dispatch(fetchOrdersStart());
        try {
            const response = await axios.get('/orders.json');
            const fetchedOrders = [];
            for (let key in response.data) {
                fetchedOrders.unshift({
                    ...response.data[key],
                    id: key
                });
            }
            dispatch(fetchOrdersSuccess(fetchedOrders));
        } catch(error) {
            dispatch(fetchOrdersFail());
        }
    }
};

import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => ({
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
});

export const purchaseBurgerFailed = (error) => ({
    type: actionTypes.PURCHASE_BURGER_FAILED,
    error: error
});

export const purchaseBurgerStart = () => ({
    type: actionTypes.PURCHASE_BURGER_START
});

export const purchaseBurger = (orderData, token) => dispatch => {
    dispatch(purchaseBurgerStart());
    axios
        .post("/orders.json?auth=" + token, orderData)
        .then(response => {
            dispatch(purchaseBurgerSuccess(response.data.name, orderData));
        })
        .catch(error => {
            dispatch(purchaseBurgerFailed(error));
        });
};
export const purchaseInit = () => ({
    type: actionTypes.PURCHASE_INIT
});

export const fetchOrdersSuccess = (orders) => ({
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders
});

export const fetchOrdersFailed = (error) => ({
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
    error: error
});

export const fetchOrdersStart = () => ({
    type: actionTypes.FETCH_ORDERS_START
});

export const fetchOrders = (token, userId) => dispatch => {
    dispatch(fetchOrdersStart());
    axios.get('/orders.json?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"')
        .then(res => {
            const fetchedOrders = [];
            for (let key in res.data) {
                fetchedOrders.unshift({...res.data[key], id: key});
            }
            dispatch(fetchOrdersSuccess(fetchedOrders));
        })
        .catch(err => {
            dispatch(fetchOrdersFailed(err));
        })

};

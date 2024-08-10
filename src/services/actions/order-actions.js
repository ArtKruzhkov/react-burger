import { BASE_URL } from "../../data/constants";
import { checkResponse } from "../../data/api";

export const SET_ORDER = 'SET_ORDER';
export const CLEAR_ORDER = 'CLEAR_ORDER';

export const setOrder = (orderNumber, orderName) => ({
    type: SET_ORDER,
    payload: { orderNumber, orderName }
});

export const clearOrder = () => ({
    type: CLEAR_ORDER
});

export const createOrder = (ingredients) => async (dispatch) => {
    try {
        dispatch(clearOrder());

        const response = await fetch(`${BASE_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ingredients })
        });

        const data = await checkResponse(response);
        if (data.success) {
            dispatch(setOrder(data.order.number, data.name));
        } else {
            throw new Error('Ошибка при создании заказа');
        }
    } catch (error) {
        alert(error);
    }
};
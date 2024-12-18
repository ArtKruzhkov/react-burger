import { BASE_URL } from "../../data/constants";
import checkResponse from "../../data/api";
import { setOrder, clearOrder } from "../reducers/order-reducer-slice";
import { clearConstructor } from "../reducers/constructor-slice";
import { AppDispatch } from "../types";

export const createOrder = (ingredients: string[]) => async (dispatch: AppDispatch) => {
    dispatch(clearOrder());

    const accessToken = localStorage.getItem('accessToken');

    try {
        const response = await fetch(`${BASE_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${accessToken}`
            },
            body: JSON.stringify({ ingredients })
        });

        const data = await checkResponse(response);
        if (data.success) {
            dispatch(setOrder({ orderNumber: data.order.number, orderName: data.name }));
            dispatch(clearConstructor());
        } else {
            throw new Error('Ошибка при создании заказа');
        }
    } catch (error) {
        alert(error);
    }
};

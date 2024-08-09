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

        const response = await fetch('https://norma.nomoreparties.space/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ingredients })
        });

        if (!response.ok) {
            throw new Error('Ошибка при отправки запроса на создание заказа');
        }

        const data = await response.json();
        if (data.success) {
            dispatch(setOrder(data.order.number, data.name));
        } else {
            throw new Error('Ошибка при создании заказа', data);
        }

    } catch (error) {
        alert(error);
    }
};
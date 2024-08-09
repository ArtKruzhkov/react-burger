export const FETCH_INGREDIENTS_REQUEST = 'FETCH_INGREDIENTS_REQUEST';
export const FETCH_INGREDIENTS_SUCCESS = 'FETCH_INGREDIENTS_SUCCESS';
export const FETCH_INGREDIENTS_FAILURE = 'FETCH_INGREDIENTS_FAILURE';

export const fetchIngredients = () => async (dispatch) => {
    dispatch({ type: FETCH_INGREDIENTS_REQUEST });
    try {
        const response = await fetch('https://norma.nomoreparties.space/api/ingredients');
        if (!response.ok) {
            throw new Error('Ошибка запроса к серверу');
        }
        const data = await response.json();
        dispatch({ type: FETCH_INGREDIENTS_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({ type: FETCH_INGREDIENTS_FAILURE, payload: error.message });
    }
};
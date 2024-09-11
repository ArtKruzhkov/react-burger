import { BASE_URL } from "../../data/constants";
// import { checkResponse } from "../../data/api";
import checkResponse from "../../data/api";

export const FETCH_INGREDIENTS_REQUEST = 'FETCH_INGREDIENTS_REQUEST';
export const FETCH_INGREDIENTS_SUCCESS = 'FETCH_INGREDIENTS_SUCCESS';
export const FETCH_INGREDIENTS_FAILURE = 'FETCH_INGREDIENTS_FAILURE';

export const fetchIngredients = () => async (dispatch) => {
    dispatch({ type: FETCH_INGREDIENTS_REQUEST });
    try {
        const response = await fetch(`${BASE_URL}/ingredients`);
        const data = await checkResponse(response);
        dispatch({ type: FETCH_INGREDIENTS_SUCCESS, payload: data.data });
    } catch (error) {
        dispatch({ type: FETCH_INGREDIENTS_FAILURE, payload: error.message });
    }
};
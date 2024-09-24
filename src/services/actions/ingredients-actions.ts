import checkResponse from "../../data/api";
import { BASE_URL } from "../../data/constants";
import { AppDispatch, AppThunk } from "../types";
import { fetchIngredientsRequest, fetchIngredientsSuccess, fetchIngredientsFailure } from "../reducers/ingredients-slice";

export const fetchIngredients = () => async (dispatch: AppDispatch) => {
    dispatch(fetchIngredientsRequest());
    try {
        const response = await fetch(`${BASE_URL}/ingredients`);
        const data = await checkResponse(response);
        dispatch(fetchIngredientsSuccess(data.data));
    } catch (error) {
        if (error instanceof Error) {
            dispatch(fetchIngredientsFailure(error.message));
        } else {
            dispatch(fetchIngredientsFailure('Unknown error occurred'));
        }
    }
};

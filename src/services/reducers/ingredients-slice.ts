import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Ingredient {
    _id: string;
    name: string;
    type: string;
    price: number;
    image: string;
    image_large: string;
    image_mobile: string;
    calories: number;
    proteins: number;
    fat: number;
    carbohydrates: number;
    [key: string]: any;
    uniqueId?: string;
}

interface IngredientsState {
    ingredients: Ingredient[];
    loading: boolean;
    error: string | null;
}

const initialState: IngredientsState = {
    ingredients: [],
    loading: true,
    error: null,
};

const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {
        fetchIngredientsRequest(state) {
            state.loading = true;
        },
        fetchIngredientsSuccess(state, action: PayloadAction<Ingredient[]>) {
            state.loading = false;
            state.ingredients = action.payload;
        },
        fetchIngredientsFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export type IIngredientsActions =
    | ReturnType<typeof fetchIngredientsRequest>
    | ReturnType<typeof fetchIngredientsSuccess>
    | ReturnType<typeof fetchIngredientsFailure>;

export const { fetchIngredientsRequest, fetchIngredientsSuccess, fetchIngredientsFailure } = ingredientsSlice.actions;
export default ingredientsSlice.reducer;

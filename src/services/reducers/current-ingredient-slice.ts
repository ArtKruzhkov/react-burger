import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Ingredient {
    _id: string;
    type: 'bun' | 'sauce' | 'main';
    [key: string]: any;
    uniqueId?: string;
}

interface CurrentIngredientState {
    ingredient: Ingredient | null;
}

const initialState: CurrentIngredientState = {
    ingredient: null,
};

const currentIngredientSlice = createSlice({
    name: 'currentIngredient',
    initialState,
    reducers: {
        setCurrentIngredient(state, action: PayloadAction<Ingredient | null>) {
            state.ingredient = action.payload;
        },
        clearCurrentIngredient(state) {
            state.ingredient = null;
        },
    },
});

export type ICurrentIngredientActions =
    | ReturnType<typeof setCurrentIngredient>
    | ReturnType<typeof clearCurrentIngredient>;

export const { setCurrentIngredient, clearCurrentIngredient } = currentIngredientSlice.actions;
export default currentIngredientSlice.reducer;
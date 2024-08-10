import { v4 as uuidv4 } from 'uuid';
export const ADD_INGREDIENT_TO_CONSTRUCTOR = 'ADD_INGREDIENT_TO_CONSTRUCTOR';
export const REMOVE_INGREDIENT_FROM_CONSTRUCTOR = 'REMOVE_INGREDIENT_FROM_CONSTRUCTOR';
export const UPDATE_INGREDIENT_ORDER = 'UPDATE_INGREDIENT_ORDER';

export const addIngredientToConstructor = (ingredient) => ({
    type: ADD_INGREDIENT_TO_CONSTRUCTOR,
    payload: { ...ingredient, uniqueId: uuidv4() }
});

export const removeIngredientFromConstructor = (uniqueId) => ({
    type: REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
    payload: uniqueId
});

export const updateIngredientOrder = (ingredients) => ({
    type: UPDATE_INGREDIENT_ORDER,
    payload: ingredients
});
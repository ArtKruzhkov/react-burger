export const ADD_INGREDIENT_TO_CONSTRUCTOR = 'ADD_INGREDIENT_TO_CONSTRUCTOR';
export const REMOVE_INGREDIENT_FROM_CONSTRUCTOR = 'REMOVE_INGREDIENT_FROM_CONSTRUCTOR';

export const addIngredientToConstructor = (ingredient) => ({
    type: ADD_INGREDIENT_TO_CONSTRUCTOR,
    payload: ingredient
});

export const removeIngredientFromConstructor = (id) => ({
    type: REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
    payload: id
});


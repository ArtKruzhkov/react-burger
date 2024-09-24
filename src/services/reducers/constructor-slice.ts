import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

interface Ingredient {
    _id: string;
    type: string; // Пример типов, можно уточнить
    [key: string]: any;
    uniqueId?: string;
}

interface ConstructorState {
    ingredients: Ingredient[];
    ingredientCounts: Record<string, number>;
}

const initialState: ConstructorState = {
    ingredients: [],
    ingredientCounts: {}
};

const constructorSlice = createSlice({
    name: 'constructorRed',
    initialState,
    reducers: {
        addIngredientToConstructor: (state, action: PayloadAction<Ingredient>) => {
            const ingredient = { ...action.payload, uniqueId: uuidv4() };
            const ingredientId = ingredient._id;

            if (!ingredient.type) {
                return state;
            }

            if (ingredient.type === 'bun') {
                const filteredIngredients = state.ingredients.filter(item => item.type !== 'bun');
                const newIngredientCounts = { ...state.ingredientCounts };

                state.ingredients.forEach(item => {
                    if (item.type === 'bun') {
                        newIngredientCounts[item._id] = 0;
                    }
                });

                return {
                    ...state,
                    ingredients: [ingredient, ...filteredIngredients, ingredient],
                    ingredientCounts: {
                        ...newIngredientCounts,
                        [ingredientId]: 2
                    }
                };
            } else {
                const updatedIngredients = [...state.ingredients, ingredient];
                const updatedIngredientCounts = {
                    ...state.ingredientCounts,
                    [ingredientId]: (state.ingredientCounts[ingredientId] || 0) + 1
                };

                return {
                    ...state,
                    ingredients: updatedIngredients,
                    ingredientCounts: updatedIngredientCounts
                };
            }
        },
        removeIngredientFromConstructor: (state, action: PayloadAction<string>) => {
            const uniqueId = action.payload;
            const ingredientIndex = state.ingredients.findIndex(ingredient => ingredient.uniqueId === uniqueId);

            if (ingredientIndex === -1) {
                return state;
            }

            const updatedIngredients = [
                ...state.ingredients.slice(0, ingredientIndex),
                ...state.ingredients.slice(ingredientIndex + 1)
            ];

            const removedIngredient = state.ingredients[ingredientIndex];
            const updatedIngredientCounts = { ...state.ingredientCounts };

            if (removedIngredient) {
                const ingredientId = removedIngredient._id;

                if (removedIngredient.type === 'bun') {
                    updatedIngredients.forEach((ingredient) => {
                        if (ingredient.type === 'bun') {
                            updatedIngredientCounts[ingredient._id] = 0;
                        }
                    });
                } else {
                    updatedIngredientCounts[ingredientId] = (updatedIngredientCounts[ingredientId] || 0) - 1;

                    if (updatedIngredientCounts[ingredientId] <= 0) {
                        delete updatedIngredientCounts[ingredientId];
                    }
                }
            }

            return {
                ...state,
                ingredients: updatedIngredients,
                ingredientCounts: updatedIngredientCounts
            };
        },
        updateIngredientOrder: (state, action: PayloadAction<Ingredient[]>) => {
            return {
                ...state,
                ingredients: action.payload
            };
        },
        clearConstructor: () => initialState,
    }
});

export const {
    addIngredientToConstructor,
    removeIngredientFromConstructor,
    updateIngredientOrder,
    clearConstructor
} = constructorSlice.actions;

export type IConstructorActions =
    | ReturnType<typeof addIngredientToConstructor>
    | ReturnType<typeof removeIngredientFromConstructor>
    | ReturnType<typeof updateIngredientOrder>
    | ReturnType<typeof clearConstructor>;

export default constructorSlice.reducer;

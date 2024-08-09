import { ADD_INGREDIENT_TO_CONSTRUCTOR, REMOVE_INGREDIENT_FROM_CONSTRUCTOR } from "../actions/constructor-actions";

const initialState = {
    ingredients: [],
    ingredientCounts: {}
};

const constructorReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_INGREDIENT_TO_CONSTRUCTOR: {
            const ingredient = action.payload;
            let updatedIngredients = [...state.ingredients];
            let updatedCounts = { ...state.ingredientCounts };

            if (ingredient.type === 'bun') {
                updatedIngredients = updatedIngredients.filter(item => item.type !== 'bun');
                updatedCounts = { ...updatedCounts };

                updatedIngredients = [ingredient, ...updatedIngredients];
                updatedCounts[ingredient._id] = 1;
            } else {
                if (updatedCounts[ingredient._id]) {
                    updatedCounts[ingredient._id] += 1;
                } else {
                    updatedCounts[ingredient._id] = 1;
                    updatedIngredients.push(ingredient);
                }
            }

            return {
                ...state,
                ingredients: updatedIngredients,
                ingredientCounts: updatedCounts
            };
        }
        case REMOVE_INGREDIENT_FROM_CONSTRUCTOR: {
            const removedIngredientId = action.payload;
            let updatedIngredients = [...state.ingredients];
            let updatedCounts = { ...state.ingredientCounts };

            if (updatedCounts[removedIngredientId]) {
                if (updatedCounts[removedIngredientId] > 1) {
                    updatedCounts[removedIngredientId] -= 1;
                } else {
                    delete updatedCounts[removedIngredientId];
                    updatedIngredients = updatedIngredients.filter(ingredient => ingredient._id !== removedIngredientId);
                }
            }

            return {
                ...state,
                ingredients: updatedIngredients,
                ingredientCounts: updatedCounts
            };
        }
        default:
            return state;
    }
};

export default constructorReducer;













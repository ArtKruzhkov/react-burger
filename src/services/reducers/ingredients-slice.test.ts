import reducer, {
    fetchIngredientsRequest,
    fetchIngredientsSuccess,
    fetchIngredientsFailure
} from './ingredients-slice';

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

describe('ingredientsSlice reducer', () => {

    it('should return the initial state', () => {
        expect(reducer(undefined, { type: '' })).toEqual(initialState);
    });

    it('should handle fetchIngredientsRequest', () => {
        const expectedState: IngredientsState = {
            ...initialState,
            loading: true,
        };

        expect(reducer(initialState, fetchIngredientsRequest())).toEqual(expectedState);
    });

    it('should handle fetchIngredientsSuccess', () => {
        const ingredients = [
            {
                _id: '1',
                name: 'Ingredient 1',
                type: 'main',
                price: 100,
                image: 'image1.png',
                image_large: 'image1_large.png',
                image_mobile: 'image1_mobile.png',
                calories: 200,
                proteins: 10,
                fat: 5,
                carbohydrates: 20,
            },
            {
                _id: '2',
                name: 'Ingredient 2',
                type: 'main',
                price: 150,
                image: 'image2.png',
                image_large: 'image2_large.png',
                image_mobile: 'image2_mobile.png',
                calories: 300,
                proteins: 15,
                fat: 7,
                carbohydrates: 25,
            },
        ];

        const expectedState: IngredientsState = {
            ...initialState,
            loading: false,
            ingredients,
        };

        expect(reducer(initialState, fetchIngredientsSuccess(ingredients))).toEqual(expectedState);
    });

    it('should handle fetchIngredientsFailure', () => {
        const errorMessage = 'Failed to fetch ingredients';
        const expectedState: IngredientsState = {
            ...initialState,
            loading: false,
            error: errorMessage,
        };

        expect(reducer(initialState, fetchIngredientsFailure(errorMessage))).toEqual(expectedState);
    });
});

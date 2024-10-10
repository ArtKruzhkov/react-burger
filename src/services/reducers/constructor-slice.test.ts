import reducer, {
    addIngredientToConstructor,
    removeIngredientFromConstructor,
    updateIngredientOrder,
    clearConstructor
} from './constructor-slice';
import { v4 as uuidv4 } from 'uuid';

jest.mock('uuid', () => ({
    v4: jest.fn(() => 'mock-uuid')
}));

interface Ingredient {
    _id: string;
    name: string;
    type: string;
    price: number;
    image: string;
    uniqueId: string;
}

const initialState = {
    ingredients: [],
    ingredientCounts: {}
};

describe('constructorSlice reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, { type: '' })).toEqual(initialState);
    });

    it('should handle addIngredientToConstructor for non-bun ingredient', () => {
        const ingredient: Ingredient = {
            _id: '123',
            name: 'Cheese',
            type: 'main',
            price: 100,
            image: 'cheese.png',
            uniqueId: ''
        };

        const uniqueId = 'mock-uuid';
        (uuidv4 as jest.Mock)
            .mockReturnValueOnce(uniqueId);

        expect(reducer(initialState, addIngredientToConstructor(ingredient))).toEqual({
            ingredients: [{ ...ingredient, uniqueId: uniqueId }],
            ingredientCounts: { '123': 1 }
        });
    });

    it('should handle addIngredientToConstructor for bun ingredient', () => {
        const bun: Ingredient = {
            _id: 'bun-1',
            name: 'Bun',
            type: 'bun',
            price: 200,
            image: 'bun.png',
            uniqueId: ''
        };

        const uniqueId = 'mock-uuid-bun';
        (uuidv4 as jest.Mock)
            .mockReturnValueOnce(uniqueId);

        const stateWithBun = {
            ingredients: [{ ...bun, uniqueId: uniqueId }, { ...bun, uniqueId: uniqueId }],
            ingredientCounts: { 'bun-1': 2 }
        };

        expect(reducer(initialState, addIngredientToConstructor(bun))).toEqual(stateWithBun);
    });

    it('should handle removeIngredientFromConstructor', () => {
        const ingredient: Ingredient = {
            _id: '123',
            name: 'Cheese',
            type: 'main',
            price: 100,
            image: 'cheese.png',
            uniqueId: 'unique-123'
        };

        const stateWithIngredient = {
            ingredients: [ingredient],
            ingredientCounts: { '123': 1 }
        };

        expect(reducer(stateWithIngredient, removeIngredientFromConstructor('unique-123'))).toEqual({
            ingredients: [],
            ingredientCounts: {}
        });
    });

    it('should handle updateIngredientOrder', () => {
        const ingredient1: Ingredient = {
            _id: '123',
            name: 'Cheese',
            type: 'main',
            price: 100,
            image: 'cheese.png',
            uniqueId: 'test-uuid'
        };
        const ingredient2: Ingredient = {
            _id: '124',
            name: 'Lettuce',
            type: 'main',
            price: 50,
            image: 'lettuce.png',
            uniqueId: 'test-uuid-2'
        };

        const newOrder = [ingredient2, ingredient1];

        expect(reducer(initialState, updateIngredientOrder(newOrder))).toEqual({
            ...initialState,
            ingredients: newOrder
        });
    });

    it('should handle clearConstructor', () => {
        const stateWithIngredients = {
            ingredients: [
                { _id: '123', name: 'Cheese', type: 'main', price: 100, image: 'cheese.png', uniqueId: 'unique-123' }
            ],
            ingredientCounts: { '123': 1 }
        };

        expect(reducer(stateWithIngredients, clearConstructor())).toEqual(initialState);
    });
});

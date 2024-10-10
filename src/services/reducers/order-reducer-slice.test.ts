import reducer, { setOrder, clearOrder } from './order-reducer-slice';

interface OrderState {
    orderNumber: number | null;
    orderName: string;
}

const initialState: OrderState = {
    orderNumber: null,
    orderName: '',
};

describe('orderSlice reducer', () => {

    it('should return the initial state', () => {
        expect(reducer(undefined, { type: '' })).toEqual(initialState);
    });

    it('should handle setOrder', () => {
        const newOrder = {
            orderNumber: 123,
            orderName: 'Test Order',
        };

        const expectedState: OrderState = {
            orderNumber: 123,
            orderName: 'Test Order',
        };

        expect(reducer(initialState, setOrder(newOrder))).toEqual(expectedState);
    });

    it('should handle clearOrder', () => {
        const previousState: OrderState = {
            orderNumber: 123,
            orderName: 'Test Order',
        };

        const expectedState: OrderState = {
            orderNumber: null,
            orderName: '',
        };

        expect(reducer(previousState, clearOrder())).toEqual(expectedState);
    });
});

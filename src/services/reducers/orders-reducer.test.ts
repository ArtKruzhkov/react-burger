import reducer, {
    wsConnectionStart,
    wsConnectionSuccess,
    wsConnectionError,
    wsConnectionClosed,
    wsGetMessage
} from './orders-reducer';

interface Order {
    _id: string;
    number: number;
    ingredients: string[];
    name: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}

interface OrdersState {
    orders: Order[];
    total: number;
    totalToday: number;
    wsConnected: boolean;
    error?: string;
}

const initialState: OrdersState = {
    orders: [],
    total: 0,
    totalToday: 0,
    wsConnected: false,
};

describe('ordersSlice reducer', () => {

    it('should return the initial state', () => {
        expect(reducer(undefined, { type: '' })).toEqual(initialState);
    });

    it('should handle wsConnectionStart', () => {
        const expectedState: OrdersState = {
            ...initialState,
            wsConnected: true,
        };

        expect(reducer(initialState, wsConnectionStart('ws://test-url'))).toEqual(expectedState);
    });

    it('should handle wsConnectionSuccess', () => {
        const expectedState: OrdersState = {
            ...initialState,
            wsConnected: true,
        };

        expect(reducer(initialState, wsConnectionSuccess())).toEqual(expectedState);
    });

    it('should handle wsConnectionError', () => {
        const errorMessage = 'WebSocket error';
        const expectedState: OrdersState = {
            ...initialState,
            wsConnected: false,
            error: errorMessage,
        };

        expect(reducer(initialState, wsConnectionError(errorMessage))).toEqual(expectedState);
    });

    it('should handle wsConnectionClosed', () => {
        const previousState: OrdersState = {
            ...initialState,
            wsConnected: true,
        };

        const expectedState: OrdersState = {
            ...initialState,
            wsConnected: false,
        };

        expect(reducer(previousState, wsConnectionClosed())).toEqual(expectedState);
    });

    it('should handle wsGetMessage', () => {
        const orders = [
            {
                _id: '1',
                number: 123,
                ingredients: ['ingredient1', 'ingredient2'],
                name: 'Order 1',
                status: 'completed',
                createdAt: '2024-01-01T00:00:00Z',
                updatedAt: '2024-01-01T01:00:00Z',
            },
            {
                _id: '2',
                number: 124,
                ingredients: ['ingredient3', 'ingredient4'],
                name: 'Order 2',
                status: 'pending',
                createdAt: '2024-01-02T00:00:00Z',
                updatedAt: '2024-01-02T01:00:00Z',
            },
        ];
        const total = 1000;
        const totalToday = 100;

        const expectedState: OrdersState = {
            ...initialState,
            orders,
            total,
            totalToday,
        };

        expect(reducer(initialState, wsGetMessage({ orders, total, totalToday }))).toEqual(expectedState);
    });
});

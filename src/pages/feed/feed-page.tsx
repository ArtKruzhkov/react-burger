import { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import OrderList from '../../components/order-list/order-list';
import OrderInfoFullPage from '../order-info-full-page/order-info-full-page';
import { useAppDispatch, useAppSelector } from '../../services/types';
import { wsConnectionStart, wsConnectionClosed } from '../../services/reducers/orders-reducer';
import styles from './feed-page.module.css';

const FeedPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const orders = useAppSelector(state => state.orders.orders);
    const totalOrders = useAppSelector(state => state.orders.total);
    const totalTodal = useAppSelector(state => state.orders.totalToday);
    const completedOrders = orders.filter(order => order.status === 'done');
    const inProgressOrders = orders.filter(order => order.status === 'pending');

    useEffect(() => {
        dispatch(wsConnectionStart('wss://norma.nomoreparties.space/orders/all'));

        return () => {
            dispatch(wsConnectionClosed());
        };
    }, [dispatch]);

    const handleOrderClick = (number: number) => {
        navigate(`/feed/${number}`, { state: { backgroundLocation: location } });
    };

    const splitIntoColumns = (orders: any[], itemsPerColumn: number) => {
        const columns = [];
        for (let i = 0; i < Math.ceil(orders.length / itemsPerColumn); i++) {
            columns.push(orders.slice(i * itemsPerColumn, i * itemsPerColumn + itemsPerColumn));
        }
        return columns;
    };

    const completedOrderColumns = splitIntoColumns(completedOrders, 5);

    return (
        <div>
            <div className={styles.ordersContainer}>
                <div>
                    <h1 className={`${styles.mainHeader} text text_type_main-large`}>Лента заказов</h1>
                    <div className={styles.scrollContainer}>
                        <OrderList onOrderClick={handleOrderClick} />
                    </div>
                </div>
                <div>
                    <div className={styles.orderStatsWrapper}>
                        <div className={styles.orderStatsContainer}>
                            <h2 className={`${styles.orderStatus} text text_type_main-medium`}>Готовы:</h2>
                            {completedOrderColumns.length > 0 ? (
                                <div className={styles.completedOrdersContainer}>
                                    {completedOrderColumns.slice(0, 2).map((column, index) => (
                                        <div key={index} className={styles.column}>
                                            {column.map(order => (
                                                <p key={order.number} className={`${styles.orderNumberReady} text text_type_digits-default`}>{order.number}</p>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className='text text_type_main-default'>Нет готовых заказов</p>
                            )}
                        </div>
                        <div className={styles.orderStatsContainer}>
                            <h2 className={`${styles.orderStatus} text text_type_main-medium`}>В работе:</h2>
                            {inProgressOrders.map(order => (
                                <p key={order.number} className={`${styles.orderNumberInProgress} text text_type_digits-default`}>{order.number}</p>
                            ))}
                        </div>
                    </div>

                    <div className={styles.statsInfoWrapper}>
                        <div className={styles.statsInfoContainer}>
                            <h3 className="text text_type_main-medium">Выполнено за все время:</h3>
                            <p className={`${styles.statsNumber} text text_type_digits-large`}>{totalOrders}</p>
                        </div>
                        <div className={styles.statsInfoContainer}>
                            <h3 className="text text_type_main-medium">Выполнено за сегодня:</h3>
                            <p className={`${styles.statsNumber} text text_type_digits-large`}>{totalTodal}</p>
                        </div>
                    </div>
                </div>
            </div>
            <Routes>
                <Route path="/:number" element={<OrderInfoFullPage />} />
            </Routes>
        </div>
    );
};

export default FeedPage;

import { useLocation } from 'react-router-dom';
import OrderItem from '../order-item/order-item';
import { useAppSelector } from '../../services/types';
import styles from './order-list.module.css';

interface IOrderListProps {
    onOrderClick: (number: number) => void;
}

const OrderList = ({ onOrderClick }: IOrderListProps) => {
    const orders = useAppSelector(state => state.orders.orders);
    const location = useLocation();

    const isProfileOrdersRoute = location.pathname === '/profile/orders';

    const displayedOrders = isProfileOrdersRoute ? [...orders].reverse() : orders;

    return (
        <div className={styles.ordersContainer}>
            {displayedOrders.map(order => (
                <OrderItem key={order.number} order={order} onClick={() => onOrderClick(order.number)} />
            ))}
        </div>
    );
};

export default OrderList;

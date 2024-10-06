import OrderInfo from '../../components/order-info/order-info';
import styles from './order-info-full-page.module.css'

function OrderInfoFullPage() {
    return (
        <div className={styles.orderInfoContainer}>
            <OrderInfo />
        </div>
    );
}

export default OrderInfoFullPage;
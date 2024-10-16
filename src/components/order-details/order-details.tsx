import { useAppSelector } from '../../services/types';
import styles from './order-details.module.css';
import icon from '../../images/order-complete-icon.svg';

function OrderDetails() {
    const orderNumber = useAppSelector(state => state.order.orderNumber);

    return (
        <div className={styles.orderDetails}>
            {orderNumber ? (
                <>
                    <p className={`${styles.orderNumber} text text_type_digits-large`}>{orderNumber}</p>
                    <p className="text text_type_main-medium">идентификатор заказа</p>
                    <img className={styles.orderIcon} src={icon} alt='order-complete-icon' />
                    <p className={`${styles.orderText} text text_type_main-default`}>Ваш заказ начали готовить</p>
                    <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
                </>
            ) : (
                <p className="text text_type_main-medium">Создание заказа...</p>
            )}
        </div>
    );
}

export default OrderDetails;
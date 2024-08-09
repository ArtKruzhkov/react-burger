import { useSelector } from 'react-redux';
import styles from './order-details.module.css';
import icon from '../../images/order-complete-icon.svg';

function OrderDetails() {
    const orderNumber = useSelector(state => state.orderReducer.orderNumber);
    // const orderName = useSelector(state => state.orderReducer.orderName);

    return (
        <div className={styles.orderDetails}>
            {orderNumber ? (
                <>
                    {/* <p className="text text_type_main-medium">Ваш заказ: {orderName}</p> */}
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



import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../services/types';
import { useEffect, useState } from 'react';
import checkResponse from '../../data/api';
import { BASE_URL } from '../../data/constants';
import styles from './order-info.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';

interface IOrder {
    ingredients: string[];
    _id: string;
    status: string;
    number: number;
    name: string;
    createdAt: string;
    updatedAt: string;
}

const OrderInfo = () => {
    const { number } = useParams<{ number: string }>();
    const [order, setOrder] = useState<IOrder | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const ingredients = useAppSelector(state => state.ingredients.ingredients);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await fetch(`${BASE_URL}/orders/${number}`);
                const data = await checkResponse(response);
                if (data.success) {
                    setOrder(data.orders[0]);
                } else {
                    setError('Не удалось получить данные о заказе');
                }
            } catch (err) {
                setError('Произошла ошибка при загрузке данных');
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [number]);

    if (loading) {
        return <p>Загрузка...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!order) {
        return <p>Заказ не найден</p>;
    }

    const totalPrice = order.ingredients.reduce((total, ingredientId) => {
        const ingredient = ingredients.find(ing => ing._id === ingredientId);
        return ingredient ? total + ingredient.price : total;
    }, 0);

    return (
        <div className={styles.orderContainerWrapper}>
            <div className={styles.orderContainer}>
                <p className="text text_type_digits-default">#{order.number}</p>
                <h2 className={`${styles.orderName} text text_type_main-medium`}>{order.name}</h2>
                <p className={`${order.status === 'done' ? styles.orderStatusComplete : styles.orderStatusInProgress} text text_type_main-default`}>
                    {order.status === 'done' ? 'Выполнен' : 'Готовится'}
                </p>
                <h3 className={`${styles.compoundHeader} text text_type_main-medium`}>Состав:</h3>
                <div className={styles.compoundContainer}>
                    {order.ingredients.map((ingredientId, index) => {
                        const ingredient = ingredients.find(ing => ing._id === ingredientId);
                        return ingredient ? (
                            <div key={index} className={styles.ingredientContainer}>
                                <img src={ingredient.image_mobile} alt={ingredient.name} className={styles.ingredientImage} />
                                <p className={`${styles.ingredientName} text text_type_main-default`}>{ingredient.name}</p>
                                <p className={`${styles.ingredientPrice} text text_type_main-default`}>
                                    1 x {ingredient.price}<CurrencyIcon type="primary" />
                                </p>
                            </div>
                        ) : null;
                    })}
                </div>
                <div className={styles.orderPriceContainer}>
                    <FormattedDate date={new Date(order.createdAt)} className='text text_type_main-default text_color_inactive' />
                    <p className={`${styles.orderPrice} text text_type_main-default`}>
                        {totalPrice}<CurrencyIcon type="primary" />
                    </p>
                </div>
            </div>
        </div>
    );
};

export default OrderInfo;

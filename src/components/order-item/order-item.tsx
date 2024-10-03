import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../../services/types';
import styles from './order-item.module.css';
import { CSSProperties } from 'react';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';

interface IOrderItemProps {
    order: {
        number: number;
        ingredients: string[];
        name: string;
        status: string;
        createdAt: string;
    };
    onClick: () => void;
}

function OrderItem({ order, onClick }: IOrderItemProps) {
    const location = useLocation();
    const isProfileOrdersPage = location.pathname.startsWith('/profile/orders');

    const orderNumber = order.number;
    const orderName = order.name;
    const orderIngredients = order.ingredients;
    const orderStatus = order.status;
    const dateFromServer = order.createdAt;

    const ingredients = useAppSelector(state => state.ingredients.ingredients);

    const orderPrice = orderIngredients.reduce((total, ingredientId) => {
        const ingredient = ingredients.find(ing => ing._id === ingredientId);
        return ingredient ? total + ingredient.price : total;
    }, 0);

    const statusStyleCompleted = orderStatus === 'done' ? styles.orderStatusComplete : '';

    let bunShown = false;

    return (
        <div onClick={onClick} className={styles.orderContainer}>
            <div className={styles.orderNumberContainer}>
                <p className="text text_type_digits-default">#{orderNumber}</p>
                <FormattedDate date={new Date(dateFromServer)} className='text text_type_main-default text_color_inactive' />
            </div>
            <h3 className={`${styles.orderName} text text_type_main-medium ${isProfileOrdersPage ? styles.orderNameProfile : ''}`}>
                {orderName}
            </h3>
            {isProfileOrdersPage && (
                <p className={`${styles.orderStatus} text text_type_main-default ${statusStyleCompleted}`}>
                    {order.status === 'done' ? 'Выполнен' : 'Готовится'}
                </p>
            )}
            <div className={styles.ingredientsAndPriceWrapper}>
                <div className={styles.ingredientsContainer}>
                    {orderIngredients.slice(0, 6).map((ingredientId, index) => {
                        const ingredient = ingredients.find(ing => ing._id === ingredientId);
                        if (!ingredient) return null;

                        if (ingredient.type === 'bun') {
                            if (bunShown) return null;
                            bunShown = true;
                        }

                        if (index === 5 && orderIngredients.length > 6) {
                            const remainingCount = orderIngredients.length - 6;
                            return (
                                <div
                                    key={index}
                                    className={styles.ingredientWrapper}
                                    style={{ zIndex: 10 - index, '--index': index } as CSSProperties}
                                >
                                    <img src={ingredient.image} alt={ingredient.name} className={styles.ingredientImage} />
                                    <span className={`${styles.remainingCount} text text_type_digits-default`}>+{remainingCount}</span>
                                </div>
                            );
                        }

                        return (
                            <div
                                key={index}
                                className={styles.ingredientWrapper}
                                style={{ zIndex: 10 - index, '--index': index } as CSSProperties}
                            >
                                <img src={ingredient.image} alt={ingredient.name} className={styles.ingredientImage} />
                            </div>
                        );
                    })}
                </div>
                <p className={`${styles.priceIngredient} text text_type_digits-default`}>
                    {orderPrice}
                    <CurrencyIcon type="primary" />
                </p>
            </div>
        </div>
    );
}

export default OrderItem;
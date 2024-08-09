import { useDrop } from 'react-dnd';
import { ItemTypes } from '../../data/itemTypes';
import { useDispatch, useSelector } from 'react-redux';
import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import Modal from '../modals/modal/modal';
import OrderDetails from '../order-details/order-details';
import { addIngredientToConstructor, removeIngredientFromConstructor } from '../../services/actions/constructor-actions';
import { createOrder } from '../../services/actions/order-actions';
import { useState } from 'react';

const DroppableArea = ({ onDrop, children }) => {
    const [{ isOver }, drop] = useDrop({
        accept: ItemTypes.INGREDIENT,
        drop: (item) => onDrop(item),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    });

    return (
        <div ref={drop} className={`${styles.droppableArea} ${isOver ? styles.active : ''}`}>
            {children}
        </div>
    );
};

const BurgerConstructor = () => {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const selectedIngredients = useSelector(state => state.constructorReducer.ingredients);
    const ingredientCounts = useSelector(state => state.constructorReducer.ingredientCounts);

    const bun = selectedIngredients.find(ingredient => ingredient.type === 'bun');
    const otherIngredients = selectedIngredients.filter(ingredient => ingredient.type !== 'bun');

    const calculateTotalPrice = () => {
        const bunPrice = bun ? bun.price * 2 : 0;
        const otherIngredientsPrice = otherIngredients.reduce((sum, ingredient) => sum + ingredient.price * ingredientCounts[ingredient._id], 0);
        return bunPrice + otherIngredientsPrice;
    };

    const totalPrice = calculateTotalPrice();

    const openOrderModal = () => {
        const ingredientIds = selectedIngredients.map(ingredient => ingredient._id);

        if (ingredientIds.length === 0) {
            alert('Добавьте ингредиенты в конструктор!');
            return;
        }

        dispatch(createOrder(ingredientIds));
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleDrop = (ingredient) => {
        if (ingredient.type === 'bun') {
            if (bun) {
                dispatch(removeIngredientFromConstructor(bun._id));
            }
            dispatch(addIngredientToConstructor(ingredient));
        } else {
            dispatch(addIngredientToConstructor(ingredient));
        }
    };

    const handleRemove = (ingredientId) => {
        dispatch(removeIngredientFromConstructor(ingredientId));
    };

    return (
        <section className={styles.sectionConstructor}>
            <DroppableArea onDrop={handleDrop}>
                <div className={`${styles.containerScrollConstructor} custom-scroll`}>
                    {bun && (
                        <div>
                            <ConstructorElement
                                type="top"
                                isLocked={true}
                                text={`${bun.name} (верх)`}
                                price={bun.price}
                                thumbnail={bun.image}
                            />
                        </div>
                    )}

                    {otherIngredients.map((ingredient) => (
                        <div key={ingredient._id} className={styles.ingredientsContainer}>
                            <div className={styles.dragIcon}><DragIcon type="primary" /></div>
                            <ConstructorElement
                                text={`${ingredient.name} (${ingredientCounts[ingredient._id]})`}
                                price={ingredient.price}
                                thumbnail={ingredient.image}
                                handleClose={() => handleRemove(ingredient._id)}
                            />
                        </div>
                    ))}

                    {bun && (
                        <div>
                            <ConstructorElement
                                type="bottom"
                                isLocked={true}
                                text={`${bun.name} (низ)`}
                                price={bun.price}
                                thumbnail={bun.image}
                            />
                        </div>
                    )}
                </div>
            </DroppableArea>

            <div className={styles.totalPriceContainer}>
                <p className={`${styles.totalPrice} text text_type_digits-medium`}>
                    {totalPrice}<CurrencyIcon type="primary" />
                </p>
                <Button
                    htmlType="button"
                    type="primary"
                    size="large"
                    onClick={openOrderModal}
                >
                    Оформить заказ
                </Button>
            </div>

            {isModalOpen && (
                <Modal onClose={closeModal}>
                    <OrderDetails />
                </Modal>
            )}
        </section>
    );
};

export default BurgerConstructor;


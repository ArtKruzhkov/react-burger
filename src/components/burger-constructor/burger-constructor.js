import { useDrop, useDrag } from 'react-dnd';
import { ItemTypes } from '../../data/itemTypes';
import { useDispatch, useSelector } from 'react-redux';
import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import Modal from '../modals/modal/modal';
import OrderDetails from '../order-details/order-details';
import { createOrder } from '../../services/actions/order-actions';
import { addIngredientToConstructor, removeIngredientFromConstructor, updateIngredientOrder } from '../../services/actions/constructor-actions';
import { useState } from 'react';

const DraggableIngredient = ({ ingredient, index, moveIngredient, handleRemove, otherIngredients }) => {
    const [, drag] = useDrag({
        type: ItemTypes.INGREDIENT,
        item: { id: ingredient.uniqueId, index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    });

    const [, drop] = useDrop({
        accept: ItemTypes.INGREDIENT,
        hover: (item) => {
            const isInConstructor = item.index !== undefined && item.index >= 0 && item.index < otherIngredients.length;

            if (isInConstructor && item.index !== index) {
                moveIngredient(item.index, index);
                item.index = index;
            }
        }
    });

    return (
        <div ref={(node) => drag(drop(node))} className={styles.ingredientsContainer}>
            <div className={styles.dragIcon}><DragIcon type="primary" /></div>
            <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
                handleClose={() => handleRemove(ingredient.uniqueId)}
            />
        </div>
    );
};

const DroppableArea = ({ onDrop, children }) => {
    const [{ isOver }, drop] = useDrop({
        accept: ItemTypes.INGREDIENT,
        drop: (item) => onDrop(item),
        collect: (monitor) => ({
            isOver: monitor.isOver()
        })
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
    const bun = selectedIngredients.find(ingredient => ingredient.type === 'bun');
    const otherIngredients = selectedIngredients.filter(ingredient => ingredient.type !== 'bun');

    const calculateTotalPrice = () => {
        const bunPrice = bun ? bun.price * 2 : 0;
        const otherIngredientsPrice = otherIngredients.reduce((sum, ingredient) => sum + ingredient.price, 0);
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
        dispatch(addIngredientToConstructor(ingredient));
    };

    const handleRemove = (uniqueId) => {
        dispatch(removeIngredientFromConstructor(uniqueId));
    };

    const moveIngredient = (fromIndex, toIndex) => {
        const updatedIngredients = [...otherIngredients];
        const [movedIngredient] = updatedIngredients.splice(fromIndex, 1);
        updatedIngredients.splice(toIndex, 0, movedIngredient);
        dispatch(updateIngredientOrder([
            ...selectedIngredients.filter(ingredient => ingredient.type === 'bun'),
            ...updatedIngredients
        ]));
    };

    return (
        <section className={styles.sectionConstructor}>
            <DroppableArea onDrop={handleDrop}>
                <div className={`${styles.containerScrollConstructor} custom-scroll`}>
                    {bun && (
                        <div className={styles.ingredientsContainer}>
                            <ConstructorElement
                                type="top"
                                isLocked={true}
                                text={`${bun.name} (верх)`}
                                price={bun.price}
                                thumbnail={bun.image}
                            />
                        </div>
                    )}

                    {otherIngredients.map((ingredient, index) => (
                        <DraggableIngredient
                            key={ingredient.uniqueId}
                            ingredient={ingredient}
                            index={index}
                            moveIngredient={moveIngredient}
                            handleRemove={handleRemove}
                            otherIngredients={otherIngredients}
                        />
                    ))}

                    {bun && (
                        <div className={styles.ingredientsContainer}>
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
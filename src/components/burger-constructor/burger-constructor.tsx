import { useDrop, useDrag } from 'react-dnd';
import { ItemTypes } from '../../data/constants';
import { useAppDispatch, useAppSelector } from '../../services/types';
import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import Modal from '../modals/modal/modal';
import OrderDetails from '../order-details/order-details';
import { createOrder } from '../../services/actions/order-actions';
import { addIngredientToConstructor, removeIngredientFromConstructor, updateIngredientOrder } from '../../services/reducers/constructor-slice';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface IIngredient {
    uniqueId: string;
    _id: string;
    name: string;
    type: string;
    price: number;
    image: string;
}

interface IDraggableIngredientProps {
    ingredient: IIngredient;
    index: number;
    moveIngredient: (fromIndex: number, toIndex: number) => void;
    handleRemove: (uniqueId: string) => void;
    otherIngredients: IIngredient[];
}

interface IDroppableAreaProps {
    onDrop: (ingredient: IIngredient) => void;
    children: React.ReactNode;
}

const DraggableIngredient = ({ ingredient, index, moveIngredient, handleRemove, otherIngredients }: IDraggableIngredientProps) => {
    const [, drag] = useDrag({
        type: ItemTypes.INGREDIENT,
        item: { id: ingredient.uniqueId, index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    });

    const [, drop] = useDrop({
        accept: ItemTypes.INGREDIENT,
        hover: (item: { index: number }) => {
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
                data-testid={`ingredient-${ingredient.type}`} // Изменено здесь
            />
        </div>
    );
};

const DroppableArea = ({ onDrop, children }: IDroppableAreaProps) => {
    const [{ isOver }, drop] = useDrop({
        accept: ItemTypes.INGREDIENT,
        drop: (item: IIngredient) => onDrop(item),
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
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const selectedIngredients = useAppSelector(state => state.constructorRed.ingredients);
    const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
    const bun = selectedIngredients.find((ingredient: IIngredient) => ingredient.type === 'bun');
    const otherIngredients = selectedIngredients.filter((ingredient: IIngredient) => ingredient.type !== 'bun');

    const calculateTotalPrice = () => {
        const bunPrice = bun ? bun.price * 2 : 0;
        const otherIngredientsPrice = otherIngredients.reduce((sum: number, ingredient: IIngredient) => sum + ingredient.price, 0);
        return bunPrice + otherIngredientsPrice;
    };

    const totalPrice = calculateTotalPrice();

    const openOrderModal = () => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        const bun = selectedIngredients.find((ingredient: IIngredient) => ingredient.type === 'bun');
        const otherIngredientIds = selectedIngredients
            .filter((ingredient: IIngredient) => ingredient.type !== 'bun')
            .map((ingredient: IIngredient) => ingredient._id);

        let ingredientIds: string[];
        if (bun) {
            ingredientIds = [bun._id, ...otherIngredientIds, bun._id];
        } else {
            ingredientIds = otherIngredientIds;
        }

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

    const handleDrop = (ingredient: IIngredient) => {
        dispatch(addIngredientToConstructor(ingredient));
    };

    const handleRemove = (uniqueId: string) => {
        dispatch(removeIngredientFromConstructor(uniqueId));
    };

    const moveIngredient = (fromIndex: number, toIndex: number) => {
        const updatedIngredients = [...otherIngredients];
        const [movedIngredient] = updatedIngredients.splice(fromIndex, 1);
        updatedIngredients.splice(toIndex, 0, movedIngredient);
        dispatch(updateIngredientOrder([
            ...selectedIngredients.filter((ingredient: IIngredient) => ingredient.type === 'bun'),
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
                                data-testid={`ingredient-${bun.type}`}
                            />
                        </div>
                    )}

                    {otherIngredients.map((ingredient: IIngredient, index: number) => (
                        <DraggableIngredient
                            key={ingredient.uniqueId}
                            ingredient={ingredient}
                            index={index}
                            moveIngredient={moveIngredient}
                            handleRemove={handleRemove}
                            otherIngredients={otherIngredients}
                            data-testid={`ingredient-${ingredient.type}`}
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
                                data-testid={`ingredient-${bun.type}`}
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
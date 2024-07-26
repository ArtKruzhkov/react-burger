import { useState } from 'react';
import PropTypes from 'prop-types';
import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import Modal from '../modals/modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';

function BurgerConstructor({ selectedIngredients }) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);

    const bun = selectedIngredients.find(ingredient => ingredient.type === 'bun');
    const otherIngredients = selectedIngredients.filter(ingredient => ingredient.type !== 'bun');

    const calculateTotalPrice = () => {
        const bunPrice = bun ? bun.price * 2 : 0;
        const otherIngredientsPrice = otherIngredients.reduce((sum, ingredient) => sum + ingredient.price, 0);
        return bunPrice + otherIngredientsPrice;
    };

    const totalPrice = calculateTotalPrice();

    const openOrderModal = () => {
        setModalContent(<OrderDetails />);
        setIsModalOpen(true);
    };

    const openIngredientModal = (ingredient) => {
        setModalContent(
            <IngredientDetails {...ingredient} />
        );
        setIsModalOpen(true);
    }

    return (
        <section className={styles.sectionConstructor}>
            <div className={`${styles.containerScrollConstructor} custom-scroll`}>
                <div className={styles.itemsContainer}>
                    {bun && (
                        <div onClick={() => openIngredientModal(bun)}>
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
                        <div className={styles.ingredientsContainer} key={index} onClick={() => openIngredientModal(ingredient)}>
                            <div className={styles.dragIcon}><DragIcon type="primary" /></div>
                            <ConstructorElement
                                text={ingredient.name}
                                price={ingredient.price}
                                thumbnail={ingredient.image}
                            />
                        </div>
                    ))}
                    {bun && (
                        <div onClick={() => openIngredientModal(bun)}>
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
            </div>
            <div className={styles.totalPriceContainer}>
                <p className={`${styles.totalPrice} text text_type_digits-medium`}>{totalPrice}<CurrencyIcon type="primary" /></p>
                <Button htmlType="button" type="primary" size="large" onClick={openOrderModal}>
                    Оформить заказ
                </Button>
            </div>
            {isModalOpen && (
                <Modal onClose={() => setIsModalOpen(false)}>
                    {modalContent}
                </Modal>
            )}
        </section>
    );
};

BurgerConstructor.propTypes = {
    selectedIngredients: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default BurgerConstructor;

import React from 'react';
import PropTypes from 'prop-types';
import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';

const BurgerConstructor = ({ selectedIngredients }) => {

    const bun = selectedIngredients.find(ingredient => ingredient.type === 'bun');
    const otherIngredients = selectedIngredients.filter(ingredient => ingredient.type !== 'bun');

    const calculateTotalPrice = () => {
        const bunPrice = bun ? bun.price * 2 : 0;
        const otherIngredientsPrice = otherIngredients.reduce((sum, ingredient) => sum + ingredient.price, 0);
        return bunPrice + otherIngredientsPrice;
    };

    const totalPrice = calculateTotalPrice();

    return (
        <section className={styles.sectionConstructor}>
            <div className={`${styles.containerScrollConstructor} custom-scroll`}>
                <div className={styles.itemsContainer}>
                    {bun && (
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={`${bun.name} (верх)`}
                            price={bun.price}
                            thumbnail={bun.image}
                        />
                    )}
                    {otherIngredients.map((ingredient, index) => (
                        <div className={styles.ingredientsContainer} key={index}>
                            <div className={styles.dragIcon}><DragIcon type="primary" /></div>
                            <ConstructorElement
                                text={ingredient.name}
                                price={ingredient.price}
                                thumbnail={ingredient.image}
                            />
                        </div>
                    ))}
                    {bun && (
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text={`${bun.name} (низ)`}
                            price={bun.price}
                            thumbnail={bun.image}
                        />
                    )}
                </div>
            </div>
            <div className={styles.totalPriceContainer}>
                <p className={`${styles.totalPrice} text text_type_digits-medium`}>{totalPrice}<CurrencyIcon type="primary" /></p>
                <Button htmlType="button" type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
        </section>

    );
};

BurgerConstructor.propTypes = {
    selectedIngredients: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default BurgerConstructor;

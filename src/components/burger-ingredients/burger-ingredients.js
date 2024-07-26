import { useState } from 'react';
import PropTypes from 'prop-types';
import { Tab, CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-ingredients.module.css';

const IngredientsList = ({ title, ingredientsList, onIngredientClick, clickedIngredients, selectedBun }) => {
    const handleIngredientClick = (ingredient) => {
        onIngredientClick(ingredient);
    };

    return (
        <div>
            <h3 className={`${styles.itemsContainerHeader} text text_type_main-medium`}>{title}</h3>
            <div className={styles.itemsContainer}>
                {ingredientsList.map(ingredient => (
                    <div
                        className={`${styles.item} ${selectedBun === ingredient._id ? styles.selected : ''}`}
                        key={ingredient._id}
                        onClick={() => handleIngredientClick(ingredient)}
                    >
                        <img src={ingredient.image} alt={ingredient.name}></img>
                        <p className={`${styles.itemPrice} text text_type_digits-default`}>{ingredient.price}<CurrencyIcon /></p>
                        <p className="text text_type_main-default">{ingredient.name}</p>
                        {clickedIngredients[ingredient._id] && (
                            <Counter count={clickedIngredients[ingredient._id]} size="default" extraClass={styles.counter} />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

IngredientsList.propTypes = {
    title: PropTypes.string.isRequired,
    ingredientsList: PropTypes.arrayOf(PropTypes.object).isRequired,
    onIngredientClick: PropTypes.func.isRequired,
    clickedIngredients: PropTypes.object.isRequired,
    selectedBun: PropTypes.string,
};

function BurgerIngredients({ ingredients, onAddIngredient }) {
    const [current, setCurrent] = useState('bun');
    const [clickedIngredients, setClickedIngredients] = useState({});
    const [selectedBun, setSelectedBun] = useState(null);

    const buns = ingredients.filter(ingredient => ingredient.type === 'bun');
    const mains = ingredients.filter(ingredient => ingredient.type === 'main');
    const sauces = ingredients.filter(ingredient => ingredient.type === 'sauce');

    const handleIngredientClick = (ingredient) => {
        if (ingredient.type === 'bun') {

            if (selectedBun && selectedBun !== ingredient._id) {
                setClickedIngredients(prevState => ({
                    ...prevState,
                    [selectedBun]: null
                }));
            }

            setSelectedBun(ingredient._id);

            setClickedIngredients(prevState => ({
                ...prevState,
                [ingredient._id]: 1
            }));

        } else {
            setClickedIngredients(prevState => ({
                ...prevState,
                [ingredient._id]: (prevState[ingredient._id] || 0) + 1
            }));
        }

        onAddIngredient(ingredient);
    };

    return (
        <section>
            <h2 className={`${styles.sectionHeader} text text_type_main-large`}>
                Соберите бургер
            </h2>
            <div style={{ display: 'flex' }} className={styles.tabBar}>
                <Tab value="bun" active={current === 'bun'} onClick={() => setCurrent('bun')}>
                    Булки
                </Tab>
                <Tab value="sauce" active={current === 'sauce'} onClick={() => setCurrent('sauce')}>
                    Соусы
                </Tab>
                <Tab value="main" active={current === 'main'} onClick={() => setCurrent('main')}>
                    Начинки
                </Tab>
            </div>
            <div className={`custom-scroll ${styles.containerScroll}`}>
                {current === 'bun' && (
                    <>
                        <IngredientsList
                            title="Булки"
                            ingredientsList={buns}
                            onIngredientClick={handleIngredientClick}
                            clickedIngredients={clickedIngredients}
                            selectedBun={selectedBun}
                        />
                        <IngredientsList
                            title="Соусы"
                            ingredientsList={sauces}
                            onIngredientClick={handleIngredientClick}
                            clickedIngredients={clickedIngredients}
                        />
                        <IngredientsList
                            title="Начинки"
                            ingredientsList={mains}
                            onIngredientClick={handleIngredientClick}
                            clickedIngredients={clickedIngredients}
                        />
                    </>
                )}
                {current === 'sauce' && (
                    <IngredientsList
                        title="Соусы"
                        ingredientsList={sauces}
                        onIngredientClick={handleIngredientClick}
                        clickedIngredients={clickedIngredients}
                    />
                )}
                {current === 'main' && (
                    <IngredientsList
                        title="Начинки"
                        ingredientsList={mains}
                        onIngredientClick={handleIngredientClick}
                        clickedIngredients={clickedIngredients}
                    />
                )}
            </div>
        </section>
    );
}

BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(PropTypes.object).isRequired,
    onAddIngredient: PropTypes.func.isRequired,
};

export default BurgerIngredients;

import { useEffect, useState, useRef } from 'react';
import { useDrag } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Tab, CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { fetchIngredients } from '../../services/actions/ingredients-actions';
import { ItemTypes } from '../../data/itemTypes';
import Modal from '../modals/modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import styles from './burger-ingredients.module.css';

const DraggableIngredient = ({ ingredient, onIngredientClick, count }) => {
    const [, drag] = useDrag({
        type: ItemTypes.INGREDIENT,
        item: ingredient,
    });

    return (
        <div
            ref={drag}
            className={`${styles.item} ${styles.draggableItem}`}
            onClick={() => onIngredientClick(ingredient)}
        >
            <img src={ingredient.image} alt={ingredient.name} />
            <p className={`${styles.itemPrice} text text_type_digits-default`}>
                {ingredient.price}<CurrencyIcon />
            </p>
            <p className="text text_type_main-default">{ingredient.name}</p>
            {count > 0 && <Counter count={count} size="default" />}
        </div>
    );
};


DraggableIngredient.propTypes = {
    ingredient: PropTypes.object.isRequired,
    onIngredientClick: PropTypes.func.isRequired,
    count: PropTypes.number.isRequired
};

const IngredientsList = ({ title, ingredientsList, clickedIngredients, innerRef, onIngredientClick }) => {
    return (
        <div ref={innerRef}>
            <h3 className={`${styles.itemsContainerHeader} text text_type_main-medium`}>{title}</h3>
            <div className={styles.itemsContainer}>
                {ingredientsList.map(ingredient => (
                    <DraggableIngredient
                        key={ingredient._id}
                        ingredient={ingredient}
                        onIngredientClick={onIngredientClick}
                        count={clickedIngredients[ingredient._id] || 0}
                    />
                ))}
            </div>
        </div>
    );
};

IngredientsList.propTypes = {
    title: PropTypes.string.isRequired,
    ingredientsList: PropTypes.arrayOf(PropTypes.object).isRequired,
    clickedIngredients: PropTypes.object.isRequired,
    innerRef: PropTypes.object,
    onIngredientClick: PropTypes.func.isRequired,
};

function BurgerIngredients() {
    const dispatch = useDispatch();
    const ingredients = useSelector(state => state.ingredients.ingredients);
    const clickedIngredients = useSelector(state => state.constructorReducer.ingredientCounts);
    const [current, setCurrent] = useState('bun');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentIngredient, setCurrentIngredient] = useState(null);

    const bunsRef = useRef(null);
    const saucesRef = useRef(null);
    const mainsRef = useRef(null);
    const containerRef = useRef(null);

    const buns = ingredients.filter(ingredient => ingredient.type === 'bun');
    const mains = ingredients.filter(ingredient => ingredient.type === 'main');
    const sauces = ingredients.filter(ingredient => ingredient.type === 'sauce');

    useEffect(() => {
        dispatch(fetchIngredients());
    }, [dispatch]);

    useEffect(() => {
        const container = containerRef.current;

        const handleScroll = () => {
            if (bunsRef.current && saucesRef.current && mainsRef.current && container) {
                const bunsTop = bunsRef.current.getBoundingClientRect().top;
                const saucesTop = saucesRef.current.getBoundingClientRect().top;
                const mainsTop = mainsRef.current.getBoundingClientRect().top;
                const containerTop = container.getBoundingClientRect().top;

                const bunsOffset = Math.abs(containerTop - bunsTop);
                const saucesOffset = Math.abs(containerTop - saucesTop);
                const mainsOffset = Math.abs(containerTop - mainsTop);

                if (bunsOffset < saucesOffset && bunsOffset < mainsOffset) {
                    setCurrent('bun');
                } else if (saucesOffset < mainsOffset) {
                    setCurrent('sauce');
                } else {
                    setCurrent('main');
                }
            }
        };

        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
    }, []);

    const handleIngredientClick = (ingredient) => {
        setCurrentIngredient(ingredient);
        setIsModalOpen(true);
    };

    const handleTabClick = (tab) => {
        setCurrent(tab);
        const tabRef = tab === 'bun' ? bunsRef : tab === 'sauce' ? saucesRef : mainsRef;
        tabRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentIngredient(null);
    };

    return (
        <section>
            <h2 className={`${styles.sectionHeader} text text_type_main-large`}>
                Соберите бургер
            </h2>
            <div className={styles.tabBar}>
                <Tab value="bun" active={current === 'bun'} onClick={() => handleTabClick('bun')}>
                    Булки
                </Tab>
                <Tab value="sauce" active={current === 'sauce'} onClick={() => handleTabClick('sauce')}>
                    Соусы
                </Tab>
                <Tab value="main" active={current === 'main'} onClick={() => handleTabClick('main')}>
                    Начинки
                </Tab>
            </div>
            <div id="ingredients-container" ref={containerRef} className={`custom-scroll ${styles.containerScroll}`}>
                <IngredientsList
                    innerRef={bunsRef}
                    title="Булки"
                    ingredientsList={buns}
                    clickedIngredients={clickedIngredients}
                    onIngredientClick={handleIngredientClick}
                />
                <IngredientsList
                    innerRef={saucesRef}
                    title="Соусы"
                    ingredientsList={sauces}
                    clickedIngredients={clickedIngredients}
                    onIngredientClick={handleIngredientClick}
                />
                <IngredientsList
                    innerRef={mainsRef}
                    title="Начинки"
                    ingredientsList={mains}
                    clickedIngredients={clickedIngredients}
                    onIngredientClick={handleIngredientClick}
                />
            </div>
            {isModalOpen && (
                <Modal onClose={closeModal}>
                    {currentIngredient && <IngredientDetails {...currentIngredient} />}
                </Modal>
            )}
        </section>
    );
}

export default BurgerIngredients;

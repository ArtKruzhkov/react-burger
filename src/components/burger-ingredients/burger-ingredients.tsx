import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Tab, CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { ItemTypes } from '../../data/constants';
import { useDrag } from 'react-dnd';
import styles from './burger-ingredients.module.css';

interface IIngredient {
    _id: string;
    name: string;
    type: string;
    price: number;
    image: string;
}

interface IDraggableIngredientProps {
    ingredient: IIngredient;
    onIngredientClick: (ingredient: IIngredient) => void;
    count: number;
}

const DraggableIngredient = ({ ingredient, onIngredientClick, count }: IDraggableIngredientProps) => {
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
                {ingredient.price}<CurrencyIcon type='primary' />
            </p>
            <p className="text text_type_main-default">{ingredient.name}</p>
            {count > 0 && <Counter count={count} size="default" />}
        </div>
    );
};

function BurgerIngredients() {
    // @ts-ignore
    const ingredients = useSelector(state => state.ingredients.ingredients);
    // @ts-ignore
    const clickedIngredients = useSelector(state => state.constructorReducer.ingredientCounts);
    const [current, setCurrent] = useState<string>('bun');
    const navigate = useNavigate();

    const bunsRef = useRef<HTMLDivElement>(null);
    const saucesRef = useRef<HTMLDivElement>(null);
    const mainsRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const buns = ingredients.filter((ingredient: IIngredient) => ingredient.type === 'bun');
    const mains = ingredients.filter((ingredient: IIngredient) => ingredient.type === 'main');
    const sauces = ingredients.filter((ingredient: IIngredient) => ingredient.type === 'sauce');

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

        if (container) {
            container.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (container) {
                container.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    const handleIngredientClick = (ingredient: IIngredient) => {
        navigate(`/ingredients/${ingredient._id}`, { state: { backgroundLocation: location.pathname, ingredient } });
    };

    const handleTabClick = (tab: string) => {
        setCurrent(tab);
        const tabRef = tab === 'bun' ? bunsRef : tab === 'sauce' ? saucesRef : mainsRef;
        tabRef.current?.scrollIntoView({ behavior: 'smooth' });
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
                <div ref={bunsRef}>
                    <h3 className={`${styles.itemsContainerHeader} text text_type_main-medium`}>Булки</h3>
                    <div className={styles.itemsContainer}>
                        {buns.map((ingredient: IIngredient) => (
                            <DraggableIngredient
                                key={ingredient._id}
                                ingredient={ingredient}
                                onIngredientClick={handleIngredientClick}
                                count={clickedIngredients[ingredient._id] || 0}
                            />
                        ))}
                    </div>
                </div>
                <div ref={saucesRef}>
                    <h3 className={`${styles.itemsContainerHeader} text text_type_main-medium`}>Соусы</h3>
                    <div className={styles.itemsContainer}>
                        {sauces.map((ingredient: IIngredient) => (
                            <DraggableIngredient
                                key={ingredient._id}
                                ingredient={ingredient}
                                onIngredientClick={handleIngredientClick}
                                count={clickedIngredients[ingredient._id] || 0}
                            />
                        ))}
                    </div>
                </div>
                <div ref={mainsRef}>
                    <h3 className={`${styles.itemsContainerHeader} text text_type_main-medium`}>Начинки</h3>
                    <div className={styles.itemsContainer}>
                        {mains.map((ingredient: IIngredient) => (
                            <DraggableIngredient
                                key={ingredient._id}
                                ingredient={ingredient}
                                onIngredientClick={handleIngredientClick}
                                count={clickedIngredients[ingredient._id] || 0}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default BurgerIngredients;
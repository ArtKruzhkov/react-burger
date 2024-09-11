import { useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styles from './main.module.css';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';

function MainPage() {
    // @ts-ignore
    const { ingredients, loading, error } = useSelector(state => state.ingredients);

    return (
        <DndProvider backend={HTML5Backend}>
            <main className={styles.mainContainer}>
                {loading ? (
                    <div><p className="text text_type_main-default">Loading...</p></div>
                ) : error ? (
                    <div><p className="text text_type_main-default">{error}</p></div>
                ) : ingredients && ingredients.length ? (
                    <>
                        <BurgerIngredients />
                        <BurgerConstructor />
                    </>
                ) : (
                    <div><p className="text text_type_main-default">No ingredients available</p></div>
                )}
            </main>
        </DndProvider>
    );
}

export default MainPage;
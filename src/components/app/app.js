import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { fetchIngredients } from '../../services/actions/ingredients-actions';

function App() {
  const dispatch = useDispatch();
  const { ingredients, loading, error } = useSelector(state => state.ingredients);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <div className={styles.app}>

      <AppHeader />
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
    </div >
  );
}

export default App;

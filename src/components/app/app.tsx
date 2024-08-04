import { useState, useEffect } from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

interface Ingredient {
  _id: string;
  name: string;
  image: string;
  price: number;
  type: string;
}

const API_URL = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(API_URL)
      .then(response => {
        if (!response.ok) {
          throw new Error('Ошибка запроса к серверу');
        }
        return response.json();
      })
      .then(data => {
        setIngredients(data.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  const handleAddIngredient = (ingredient: Ingredient) => {
    setSelectedIngredients(prevIngredients => {
      if (ingredient.type === 'bun') {
        const otherIngredients = prevIngredients.filter(ing => ing.type !== 'bun');
        return [ingredient, ...otherIngredients];
      } else {
        const bun = prevIngredients.find(ing => ing.type === 'bun');
        const otherIngredients = prevIngredients.filter(ing => ing.type !== 'bun');
        return bun ? [bun, ...otherIngredients, ingredient] : [...prevIngredients, ingredient];
      }
    });
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.mainContainer}>
        {loading ? (
          <div><p className="text text_type_main-default">Loading...</p></div>
        ) : error ? (
          <div><p className="text text_type_main-default">{error}</p></div>
        ) : ingredients && ingredients.length ? (
          <>
            <BurgerIngredients ingredients={ingredients} onAddIngredient={handleAddIngredient} />
            <BurgerConstructor selectedIngredients={selectedIngredients} />
          </>
        ) : (
          <div><p className="text text_type_main-default">No ingredients available</p></div>
        )}
      </main>
    </div>
  );
}

export default App;

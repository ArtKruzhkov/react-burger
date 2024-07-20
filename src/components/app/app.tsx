import React, { useState } from 'react';
import logo from './logo.svg';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import ingredients from '../../data/ingredients.json';
import BurgerConstructor from '../burger-constructor/burger-constructor';

interface Ingredient {
  _id: string;
  name: string;
  image: string;
  price: number;
  type: string;
}

function App() {
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>([]);

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
        <BurgerIngredients ingredients={ingredients} onAddIngredient={handleAddIngredient} />
        <BurgerConstructor selectedIngredients={selectedIngredients} />
      </main>
    </div>
  );
}

export default App;

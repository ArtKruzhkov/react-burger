import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import AppHeader from './components/app-header/app-header';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import ingredients from './data/ingredients.json';
import BurgerConstructor from './components/burger-constructor/burger-constructor';

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
    <div className="App">
      <AppHeader />
      <main style={{ display: 'flex', justifyContent: 'center', columnGap: '40px' }}>
        <BurgerIngredients ingredients={ingredients} onAddIngredient={handleAddIngredient} />
        <BurgerConstructor selectedIngredients={selectedIngredients} />
      </main>
    </div>
  );
}

export default App;

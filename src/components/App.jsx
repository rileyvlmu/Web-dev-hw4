import { useEffect, useState } from 'react';
import './App.css';
import SearchService from './Search.jsx';
import Results from './Results.jsx';
import { fetchMealsByIngredient } from './API.jsx';

export default function App() {
  const [ingredient, setIngredient] = useState("");
  const [meals, setMeals] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    if (ingredient) {
      console.log(`Searching for meals with ingredient: ${ingredient}`);
      fetchMealsByIngredient(ingredient).then((meals) => {
        console.log('Fetched meals:', meals);
        setMeals(meals);
      }).catch((error) => {
        console.error('Error fetching meals:', error);
      });
    }
  }, [ingredient]);

  return (
    <div className="App">
      {!selectedRecipe && (
        <>
          <h1>Meal Finder</h1>
          <div className="SearchService">
            <SearchService setter={setIngredient} />
          </div>
        </>
      )}
      <Results meals={meals} setSelectedRecipe={setSelectedRecipe} selectedRecipe={selectedRecipe} />
    </div>
  );
}



import { useEffect, useState } from 'react';
import './App.css';
import SearchService from './SearchService.jsx';
import Results from './Results.jsx';

export default function App() {
  const [nutrient, setNutrient] = useState("");
  const [meals, setMeals] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    if (nutrient) {
      const query = encodeURIComponent(nutrient.toLowerCase());
      const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => setMeals(data.meals || []));
    }
  }, [nutrient]);

  return (
    <div className="App">
      {!selectedRecipe && (
        <>
          <h1>Meal Finder</h1>
          <div className="SearchService">
            <SearchService setter={setNutrient} />
          </div>
        </>
      )}
      <Results meals={meals} setSelectedRecipe={setSelectedRecipe} selectedRecipe={selectedRecipe} />
    </div>
  );
}



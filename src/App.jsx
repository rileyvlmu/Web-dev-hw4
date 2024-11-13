import { useEffect, useState } from 'react'
import './App.css'

export default function App() {
  const [nutrient, setNutrient] = useState("");
  const [meals, setMeals] = useState([])

  useEffect(() => {
    if (nutrient) {
      const query = encodeURIComponent(nutrient.toLowerCase());
      const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`
      fetch(url)
        .then((res) => res.json())
        .then((data) => setMeals(data.meals || []));
    }
  }, [nutrient])

  return (
    <div className="App">
      <h1>Meal Finder</h1>
      <input value={nutrient} onChange={(e) => setNutrient(e.target.value)} placeholder="Enter a nutrient" />
      <div>
        {meals.map((meal) => (
          <div key={meal.idMeal}>
            <h2>{meal.strMeal}</h2>
            <img src={meal.strMealThumb} alt={meal.strMeal} />
          </div>
        ))}
      </div>
    </div>
  );
}



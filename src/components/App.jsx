import { useEffect, useState } from 'react';
import { login, logout, useAuthentication } from "../services/authService";
import './App.css';
import SearchService from './Search.jsx';
import Results from './Results.jsx';
import { fetchMealsByIngredient } from './API.jsx';
import LoginButton from './LoginButton.jsx'; // Ensure correct import

export default function App() {
  const [ingredient, setIngredient] = useState("");
  const [meals, setMeals] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const user = useAuthentication();

  useEffect(() => {
    if (ingredient) {
      console.log(`Searching for meals with ingredient: ${ingredient}`);
      setLoading(true);
      setError(null);
      fetchMealsByIngredient(ingredient).then((meals) => {
        console.log('Fetched meals:', meals);
        setMeals(meals);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching meals:', error);
        setError('Failed to load meals. Please Try again.');
        setLoading(false);
      });
    }
  }, [ingredient]);

  return (
    <div className="App">
      {!selectedRecipe && (
        <>
          <header>
            <h1>Meal Finder</h1>
            <div className="auth-button">
              {!user ? (
                <button onClick={login}>Login</button>
              ) : (
                <button onClick={logout}>Logout</button>
              )}
            </div>
          </header>
          <div className="SearchService">
            <SearchService setter={setIngredient} />
            <button className="search-button" onClick={() => setIngredient("chicken")}>Search</button>
            {loading && <p>Loading meals...</p>}
            {error && <p className="error">{error}</p>}
          </div>
        </>
      )}
      <Results meals={meals} setSelectedRecipe={setSelectedRecipe} selectedRecipe={selectedRecipe} />
    </div>
  );
}



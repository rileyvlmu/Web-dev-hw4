import { useEffect, useState } from 'react';
import { login, logout, useAuthentication } from "../services/authService";
import './App.css';
import SearchService from './Search.jsx';
import Results from './Results.jsx';
import { fetchMealsByIngredient } from './API.jsx';
import LoginButton from './LoginButton.jsx'; // Ensure correct import
import Favorites from './Favorites.jsx'; // Import the Favorites component

export default function App() {
  const [ingredient, setIngredient] = useState("");
  const [meals, setMeals] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
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

  const handleShowFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  const handleSearch = () => {
    const searchInput = document.querySelector('.SearchService input').value;
    setIngredient(searchInput);
  };

  const handleCloseRecipe = () => {
    setSelectedRecipe(null);
  };

  return (
    <div className="App">
      {!selectedRecipe && (
        <>
          <header>
            <div className="header-left">
              {user && (
                <button onClick={handleShowFavorites}>Toggle Favorites</button>
              )}
            </div>
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
            <button className="search-button" onClick={handleSearch}>Search</button>
            {loading && <p>Loading meals...</p>}
            {error && <p className="error">{error}</p>}
          </div>
        </>
      )}
      {showFavorites ? (
        <Favorites
          user={user}
          setSelectedRecipe={setSelectedRecipe}
          selectedRecipe={selectedRecipe}
          onCloseRecipe={handleCloseRecipe}
        />
      ) : (
        <Results
          meals={meals}
          setSelectedRecipe={setSelectedRecipe}
          selectedRecipe={selectedRecipe}
          user={user}
        />
      )}
    </div>
  );
}

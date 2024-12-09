// Favorites.jsx
import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import MealCard from './MealCard';
import { fetchMealDetails } from './API.jsx';
import ResultsContainer from './ResultsContainer';
import './Results.css'; // Import the CSS file for styling

export default function Favorites({ user, setSelectedRecipe, selectedRecipe, onCloseRecipe }) {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (user) {
        const q = query(collection(db, 'favorites'), where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        const favs = querySnapshot.docs.map(doc => doc.data().recipeId);

        // Fetch meal details for each favorite recipe
        const favoriteMeals = await Promise.all(favs.map(async (recipeId) => {
          const mealDetails = await fetchMealDetails(recipeId);
          return mealDetails;
        }));

        setFavorites(favoriteMeals);
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user]);

  if (loading) {
    return <p>Loading favorites...</p>;
  }

  if (!favorites.length) {
    return <p>No favorite recipes found.</p>;
  }

  return (
    <div>
      {selectedRecipe ? (
        <ResultsContainer
          meals={favorites}
          selectedRecipe={selectedRecipe}
          onRecipeSelect={setSelectedRecipe}
          onCloseRecipe={onCloseRecipe}
          loading={loading}
          user={user}
        />
      ) : (
        <div className="cards-container">
          {favorites.map((meal) => (
            <MealCard key={meal.idMeal} meal={meal} onSelect={() => setSelectedRecipe(meal)} />
          ))}
        </div>
      )}
    </div>
  );
}
// Results.jsx
import React, { useState, useCallback } from 'react';
import { fetchMealDetails } from './API.jsx';
import './Results.css'; // Import the CSS file for styling
import DOMPurify from 'dompurify';
import ResultsContainer from './ResultsContainer';

export default function Results({ meals, setSelectedRecipe, selectedRecipe, user }) {
  const [loading, setLoading] = useState(false);

  const handleRecipeClick = useCallback((meal) => {
    setLoading(true);
    fetchMealDetails(meal.idMeal).then((data) => {
      console.log('Selected meal details:', data);
      setSelectedRecipe(data);
      setLoading(false);
    });
  }, [setSelectedRecipe]);

  const handleCloseRecipe = useCallback(() => {
    setSelectedRecipe(null);
  }, [setSelectedRecipe]);

  console.log('Meals in Results component:', meals);

  if (!meals.length) {
    return <p>No results found</p>;
  }

  return (
    <ResultsContainer
      meals={meals}
      selectedRecipe={selectedRecipe}
      onRecipeSelect={handleRecipeClick}
      onCloseRecipe={handleCloseRecipe}
      loading={loading}
      user={user}
    />
  );
}

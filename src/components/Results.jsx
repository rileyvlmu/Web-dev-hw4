// Results.jsx
import React from 'react';
import { fetchMealDetails } from './API.jsx';
import ResultsContainer from './ResultsContainer';
import './Results.css';

export default function Results({ meals, setSelectedRecipe, selectedRecipe }) {
  const handleRecipeClick = (meal) => {
    fetchMealDetails(meal.idMeal).then((data) => {
      console.log('Selected meal details:', data);
      setSelectedRecipe(data);
    });
  };

  const handleCloseRecipe = () => {
    setSelectedRecipe(null);
  };

  console.log('Meals in Results component:', meals);

  return (
    <ResultsContainer
      meals={meals}
      selectedRecipe={selectedRecipe}
      onRecipeSelect={handleRecipeClick}
      onCloseRecipe={handleCloseRecipe}
    />
  );
}

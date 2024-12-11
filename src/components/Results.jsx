// Results.jsx
import React, { useState, useCallback, useEffect } from 'react';
import { fetchMealDetails } from './API.jsx';
import './Results.css'; // Import the CSS file for styling
import ResultsContainer from './ResultsContainer';

const RESULTS_PER_PAGE = 10;

export default function Results({ meals, setSelectedRecipe, selectedRecipe, user }) {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedMeals, setPaginatedMeals] = useState([]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * RESULTS_PER_PAGE;
    const endIndex = startIndex + RESULTS_PER_PAGE;
    setPaginatedMeals(meals.slice(startIndex, endIndex));
  }, [meals, currentPage]);

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

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  console.log('Meals in Results component:', meals);

  if (!meals.length) {
    return <p>No results found</p>;
  }

  return (
    <div className="results-container">
      <ResultsContainer
        meals={paginatedMeals}
        selectedRecipe={selectedRecipe}
        onRecipeSelect={handleRecipeClick}
        onCloseRecipe={handleCloseRecipe}
        loading={loading}
        user={user}
      />
      {!selectedRecipe && (
        <div className="pagination-buttons">
          {currentPage > 1 && (
            <button onClick={handlePreviousPage}>Previous Page</button>
          )}
          {meals.length > currentPage * RESULTS_PER_PAGE && (
            <button onClick={handleNextPage}>Next Page</button>
          )}
        </div>
      )}
    </div>
  );
}

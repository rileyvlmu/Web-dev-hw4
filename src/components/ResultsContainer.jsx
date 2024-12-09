// ResultsContainer.jsx
import React from 'react';
import PropTypes from 'prop-types';
import MealCard from './MealCard';
import DOMPurify from 'dompurify';
import './Results.css'; // Separate styles can be managed here

const cleanInstructions = (instructions) => {
  // Sanitize the instructions and split into an array of instructions
  const sanitizedInstructions = DOMPurify.sanitize(instructions);
  return sanitizedInstructions.split(/<\/li>\s*<li>/).map(instruction => instruction.replace(/<\/?[^>]+(>|$)/g, "").trim()).filter(instruction => instruction !== '');
};

export default function ResultsContainer({ meals, selectedRecipe, onRecipeSelect, onCloseRecipe, loading }) {
  if (!meals.length) {
    return <p>No results found</p>;
  }

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : selectedRecipe ? (
        <div className="recipe-details">
          <h2>{selectedRecipe.strMeal}</h2>
          <img src={selectedRecipe.strMealThumb} alt={selectedRecipe.strMeal} />
          <h3>Instructions</h3>
          <div className="instructions-container">
            <ol>
              {cleanInstructions(selectedRecipe.strInstructions).map(
                (instruction, index) => (
                  <li key={index}>{instruction}</li>
                )
              )}
            </ol>
          </div>
          <h3>Ingredients</h3>
          <p>{DOMPurify.sanitize(selectedRecipe.strIngredients)}</p>
          <h3>Times</h3>
          <p>Ready In: {selectedRecipe.strReadyTime} mins</p>
          <h3>Macros</h3>
          <p>Protein: {selectedRecipe.strProtein}</p>
          <p>Fat: {selectedRecipe.strFat}</p>
          <p>Carbohydrates: {selectedRecipe.strCarbs}</p>
          <p>Calories: {selectedRecipe.strCalories}</p>
          <button onClick={onCloseRecipe}>Close Recipe</button>
        </div>
      ) : (
        <div className="cards-container">
          {meals.map((meal) => (
            <MealCard key={meal.idMeal} meal={meal} onSelect={onRecipeSelect} />
          ))}
        </div>
      )}
    </div>
  );
}

ResultsContainer.propTypes = {
  meals: PropTypes.array.isRequired,
  selectedRecipe: PropTypes.object,
  onRecipeSelect: PropTypes.func.isRequired,
  onCloseRecipe: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

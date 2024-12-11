// ResultsContainer.jsx
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MealCard from './MealCard';
import DOMPurify from 'dompurify';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { saveToFavorites, removeFromFavorites } from '../services/favoritesService';
import './Results.css'; // Separate styles can be managed here

const cleanInstructions = (instructions) => {
  // Sanitize the instructions and split into an array of instructions
  const sanitizedInstructions = DOMPurify.sanitize(instructions);
  return sanitizedInstructions.split(/<\/li>\s*<li>/).map(instruction => instruction.replace(/<\/?[^>]+(>|$)/g, "").trim()).filter(instruction => instruction !== '');
};

const splitIngredients = (ingredients) => {
  // Split the ingredients string into an array of ingredients
  return ingredients.split(',').map(ingredient => ingredient.trim());
};

export default function ResultsContainer({ meals, selectedRecipe, onRecipeSelect, onCloseRecipe, loading, user }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const checkIfFavorite = async () => {
      if (user && selectedRecipe) {
        const q = query(collection(db, 'favorites'), where('userId', '==', user.uid), where('recipeId', '==', selectedRecipe.idMeal));
        const querySnapshot = await getDocs(q);
        setIsFavorite(!querySnapshot.empty);
      }
    };

    checkIfFavorite();
  }, [user, selectedRecipe]);

  const handleAddToFavorites = () => {
    if (user && selectedRecipe) {
      saveToFavorites(user.uid, selectedRecipe.idMeal);
      setIsFavorite(true);
    } else {
      console.log('User not logged in or no recipe selected');
    }
  };

  const handleRemoveFromFavorites = () => {
    if (user && selectedRecipe) {
      removeFromFavorites(user.uid, selectedRecipe.idMeal);
      setIsFavorite(false);
    } else {
      console.log('User not logged in or no recipe selected');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!meals.length) {
    return <p>No results found</p>;
  }

  return (
    <div className="cards-container">
      {selectedRecipe ? (
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
          <div className="ingredients-container">
            {splitIngredients(selectedRecipe.strIngredients).map((ingredient, index) => (
              <p key={index}>{ingredient}</p>
            ))}
          </div>
          <h3>Times</h3>
          <p>Ready In: {selectedRecipe.strReadyTime} mins</p>
          <h3>Macros</h3>
          <p>Protein: {selectedRecipe.strProtein}</p>
          <p>Fat: {selectedRecipe.strFat}</p>
          <p>Carbohydrates: {selectedRecipe.strCarbs}</p>
          <p>Calories: {selectedRecipe.strCalories}</p>
          <button onClick={onCloseRecipe}>Close Recipe</button>
          {isFavorite ? (
            <button onClick={handleRemoveFromFavorites}>Remove from Favorites</button>
          ) : (
            <button onClick={handleAddToFavorites}>Add to Favorites</button>
          )}
        </div>
      ) : (
        <div className="cards-container">
          {meals.map((meal) => (
            <MealCard key={meal.idMeal} meal={meal} onSelect={() => onRecipeSelect(meal)} />
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
  user: PropTypes.object
};

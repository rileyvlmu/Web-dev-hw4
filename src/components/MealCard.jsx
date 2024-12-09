import React from 'react';
import PropTypes from 'prop-types';
import './Results.css'; 

function MealCard({ meal, onSelect }) {
  const fallbackImage = "path/to/fallback-image.jpg"; // Default image path

  return (
    <div className="card" onClick={() => onSelect(meal)}>
      <div className="content">
        <div className="front">
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="card-image"
            onError={(e) => (e.target.src = fallbackImage)}
          />
          <div className="front-content">
            <h2 className="meal-title">{meal.strMeal}</h2>
          </div>
        </div>
        <div className="back">
          <div className="back-content">
            <h2>{meal.strMeal}</h2>
            <p>Click to see recipe</p>
          </div>
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="blurred-image"
            onError={(e) => (e.target.src = fallbackImage)}
          />
        </div>
      </div>
    </div>
  );
}

MealCard.propTypes = {
  meal: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default MealCard;

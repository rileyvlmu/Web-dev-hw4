import React from 'react';
import { fetchMealDetails } from './API.jsx';
import './Results.css'; // Import the CSS file for styling

export default function Results({ meals, setSelectedRecipe, selectedRecipe }) {
    const handleRecipeClick = (meal) => {
        fetchMealDetails(meal.idMeal).then((data) => {
            console.log('Selected meal details:', data);
            setSelectedRecipe(data);
        });
    };

    console.log('Meals in Results component:', meals);

    if (!meals.length) {
        return <p>No results found</p>;
    }

    return (
        <div className="results-container">
            {selectedRecipe ? (
                <div className="recipe-details">
                    <h2>{selectedRecipe.strMeal}</h2>
                    <img src={selectedRecipe.strMealThumb} alt={selectedRecipe.strMeal} />
                    <p>{selectedRecipe.strInstructions}</p>
                    <h3>Macros</h3>
                    <p>Protein: {selectedRecipe.strProtein}g</p>
                    <p>Fat: {selectedRecipe.strFat}g</p>
                    <p>Carbohydrates: {selectedRecipe.strCarbs}g</p>
                    <p>Calories: {selectedRecipe.strCalories}</p>
                    <button onClick={() => setSelectedRecipe(null)}>Close Recipe</button>
                </div>
            ) : (
                <div className="cards-container">
                    {meals.map((meal) => (
                        <div key={meal.idMeal} className="card" onClick={() => handleRecipeClick(meal)}>
                            <div className="content">
                                <div className="front">
                                    <img src={meal.strMealThumb} alt={meal.strMeal} className="card-image" />
                                    <div className="front-content">
                                        <h2 className="meal-title">{meal.strMeal}</h2>
                                    </div>
                                </div>
                                <div className="back">
                                    <div className="back-content">
                                        <h2>{meal.strMeal}</h2>
                                        <p>Prep Time: {meal.strPrepTime} mins</p>
                                        <p>Calories: {meal.strCalories}</p>
                                    </div>
                                    <img src={meal.strMealThumb} alt={meal.strMeal} className="blurred-image" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
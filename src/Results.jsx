import React from 'react';

export default function Results({ meals, setSelectedRecipe, selectedRecipe }) {
    const handleRecipeClick = (meal) => {
        const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`;
        fetch(url)
            .then((res) => res.json())
            .then((data) => setSelectedRecipe(data.meals[0]));
    };

    if (!meals.length) {
        return <p>No results found</p>;
    }

    return (
        <div>
            {selectedRecipe ? (
                <div>
                    <h2>{selectedRecipe.strMeal}</h2>
                    <img src={selectedRecipe.strMealThumb} alt={selectedRecipe.strMeal} />
                    <p>{selectedRecipe.strInstructions}</p>
                    <button onClick={() => setSelectedRecipe(null)}>Close Recipe</button>
                </div>
            ) : (
                meals.map((meal) => (
                    <div key={meal.idMeal}>
                        <h2>{meal.strMeal}</h2>
                        <img
                            src={meal.strMealThumb}
                            alt={meal.strMeal}
                            onClick={() => handleRecipeClick(meal)}
                            style={{ cursor: 'pointer' }}
                        />
                    </div>
                ))
            )}
        </div>
    );
}
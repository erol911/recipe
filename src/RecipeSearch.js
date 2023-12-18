import React, { useState } from "react";
import axios from "axios";
import "./RecipeSearch.css";

const RecipeSearch = ({ appID, appKey }) => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.edamam.com/search?q=${query}&app_id=${appID}&app_key=${appKey}`
      );
      setRecipes(response.data.hits);
      setShowResults(true);
      console.log(response.data.hits);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  return (
    <div className="recipe-search-container">
      <h1 className={showResults ? "hide" : ""}>Recipe Search App</h1>
      <div className={`search-bar ${showResults ? "show" : ""}`}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for recipes..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {showResults && (
        <div>
          {recipes.map((recipe) => (
            <div className="recipe-item" key={recipe.recipe.label}>
              <h3>{recipe.recipe.label}</h3>
              <img src={recipe.recipe.image} alt={recipe.recipe.label} />
              <p>
                <b>{recipe.recipe.calories.toFixed(0)} Kalories</b>,{" "}
                <u>{recipe.recipe.cuisineType} cuisine</u>
              </p>
              <p>Diet Type: {recipe.recipe.dietLabels}</p>
              <h3>Ingredients</h3>
              <ul>
                {recipe.recipe.ingredients.map((ingredient) => (
                  <li key={ingredient.text}>{ingredient.text}</li>
                ))}
              </ul>
              <h4>Health Labels</h4>
              <ul>
                {recipe.recipe.healthLabels.map((healthLabel) => (
                  <li key={healthLabel}>{healthLabel}</li>
                ))}
              </ul>

              {/* <a href={recipe.recipe.url} target="_blank" rel="noopener noreferrer">
                  View All Recipe
                </a> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeSearch;

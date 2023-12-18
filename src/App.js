import React from "react";
import RecipeSearch from "./RecipeSearch";

const App = () => {
  const APP_ID = "d212e55f";
  const APP_KEY = "03d80c8ba25f9b466cdf8c71d4809781";

  return (
    <div className="app-container">
      <div className="search-bar">
        <RecipeSearch appID={APP_ID} appKey={APP_KEY} />
      </div>
    </div>
  );
};

export default App;

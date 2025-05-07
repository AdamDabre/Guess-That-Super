import React, { useState } from "react";
import "./App.css";
import { getSearchRecommendations } from "./hooks/useSuperheroAPI";

function App() {
  const [query, setQuery] = useState("");
  const [recommendations, setRecommendations] = useState([]);

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() !== "") {
      const results = await getSearchRecommendations(value);
      setRecommendations(results);
    } else {
      setRecommendations([]);
    }
  };

  return (
    <div className="App">
      <h1>Superhero Search</h1>
      <input
        type="text"
        placeholder="Search for a superhero..."
        value={query}
        onChange={handleInputChange}
      />
      <ul>
        {recommendations.map((recommendation, index) => (
          <li key={index}>{recommendation}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

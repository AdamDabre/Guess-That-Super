import React, { useState } from "react";
import "./App.css";
import {
  getSearchRecommendations,
  fetchCharacterDetailsByKey,
} from "./hooks/useSuperheroAPI";

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

  const handleInputClick = async (e) => {
    const selectedName = e.target.innerText;
    setQuery(selectedName);
    setRecommendations([]);

    const characterDetails = await fetchCharacterDetailsByKey(selectedName);
    console.log("Selected Character Details:", characterDetails);
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
          <li onClick={handleInputClick} key={index}>
            {recommendation}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

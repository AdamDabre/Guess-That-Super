import React, { useState } from "react";
import "./App.css";
import {
  getSearchRecommendations,
  fetchCharacterDetailsByKey,
} from "./hooks/useSuperheroAPI";
import SearchComponent from "./components/SearchComponent";

function App() {
  return (
    <div className="App">
      <SearchComponent
        onResultSelect={fetchCharacterDetailsByKey}
        title="Character Search"
        placeholder="Search for a character..."
      />
    </div>
  );
}

export default App;

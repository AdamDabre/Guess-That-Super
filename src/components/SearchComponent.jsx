import { useState } from "react";
import { getSearchRecommendations } from "../hooks/useSuperheroAPI";
import styles from "./SearchComponent.module.css";

const SearchComponent = ({ onResultSelect, placeholder = "" }) => {
  const [query, setQuery] = useState("");
  const [recommendations, setRecommendations] = useState([]);

  const handleInputChange = async (e) => {
    const input = e.target.value;
    setQuery(input);

    try {
      if (input.trim() !== "") {
        const results = await getSearchRecommendations(input);
        setRecommendations(results);
      } else {
        setRecommendations([]);
      }
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  const handleRecommendationClick = (recommendation) => {
    setQuery(recommendation);
    setRecommendations([]);

    // Notify the parent component of the selected result
    if (onResultSelect) {
      onResultSelect(recommendation);
    }
    // Clear the input field after selection
    setQuery("");
  };

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        placeholder={placeholder}
        className={styles.searchInput}
        value={query}
        onChange={handleInputChange}
      />
      <ul className={styles.recommendationsList}>
        {recommendations.map((recommendation, index) => (
          <li
            key={index}
            className={styles.recommendationItem}
            onClick={() => handleRecommendationClick(recommendation)}
          >
            {recommendation}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchComponent;

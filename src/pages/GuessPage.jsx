import SearchComponent from "../components/SearchComponent";
import { fetchCharacterDetailsByKey } from "../hooks/useSuperheroAPI";
import styles from "./GuessPage.module.css";

const GuessPage = () => {
  const onGuessSubmit = async (guess) => {
    try {
      const response = await fetchCharacterDetailsByKey(guess);
      console.log("Guess submitted:", response);
    } catch (error) {
      console.error("Error submitting guess:", error);
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles.searchContainer}>
        <SearchComponent
          onResultSelect={onGuessSubmit}
          title="Character Search"
          placeholder="Search for a character..."
        />
      </div>

      <div className={styles.guessesContainer}></div>
    </section>
  );
};

export default GuessPage;

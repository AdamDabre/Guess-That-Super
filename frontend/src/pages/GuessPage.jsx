import { useEffect, useState } from "react";
import SearchComponent from "../components/SearchComponent";
import { GuessHeader } from "../components/GuessHeader";
import GuessRow from "../components/GuessRow";
import {
  fetchCharacterDetailsByKey,
  getRandomCharacter,
} from "../hooks/useSuperheroAPI";
import styles from "./GuessPage.module.css";

const GuessPage = () => {
  const [guesses, setGuesses] = useState([]);
  const [targetHero, setTargetHero] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [difficulty, setDifficulty] = useState("Casual");

  const fetchTargetHero = async () => {
    try {
      const hero = await getRandomCharacter();
      setTargetHero(hero);
      setGuesses([]); // Reset guesses
      setGameOver(false); // Reset game state
      console.log("New Target Hero:", hero); // For debugging
    } catch (error) {
      console.error("Error fetching target hero:", error);
    }
  };

  useEffect(() => {
    fetchTargetHero();
  }, []);

  const onGuessSubmit = async (guess) => {
    try {
      const response = await fetchCharacterDetailsByKey(guess);
      if (!response) throw new Error("Character not found");

      const newGuesses = [...guesses, response];
      setGuesses(newGuesses);

      // Check if guess is correct
      if (response.id === targetHero?.id) {
        setGameOver(true);
      } else if (newGuesses.length >= 10) {
        setGameOver(true);
      }
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
          disabled={gameOver}
        />
      </div>
      <div className={styles.buttonContainer}>
        <button onClick={fetchTargetHero}>New Target</button>
        <button onClick={() => setDifficulty("Casual")}>Casual</button>
        <button onClick={() => setDifficulty("Super Fan")}>Super Fan</button>
      </div>

      <div className={styles.difficultyContainer}>
        <h2>Difficulty: {difficulty}</h2>
        <p>Guesses Left: {10 - guesses.length}</p>
      </div>

      <div className={styles.guessesContainer}>
        <GuessHeader difficulty={difficulty} />
        {Array(10)
          .fill(null)
          .map((_, index) => (
            <GuessRow
              key={index}
              guess={guesses[index]}
              target={targetHero}
              revealed={gameOver || !!guesses[index]}
              difficulty={difficulty}
              placeholder={index + 1}
            />
          ))}
      </div>

      {gameOver && (
        <div className={styles.gameOver}>
          {guesses.some((g) => g.id === targetHero?.id) ? (
            <p>Congratulations! You guessed correctly!</p>
          ) : (
            <p>Game over! The correct answer was {targetHero?.name}</p>
          )}
          <button onClick={() => window.location.reload()}>Play Again</button>
        </div>
      )}
    </section>
  );
};

export default GuessPage;

import styles from "./GuessRow.module.css";
import { fetchCharactersFromJSON } from "../hooks/useSuperheroAPI";
import React from "react";

const GuessType = Object.freeze({
  HIT: 0,
  MISS: 1,
  HIGHER: 2,
  LOWER: 3,
});

const GuessRow = ({
  guess,
  target,
  revealed,
  difficulty = "Casual",
  placeholder,
}) => {
  const [characterData, setCharacterData] = React.useState([]);

  React.useEffect(() => {
    // Load characters.json data
    const loadCharacterData = async () => {
      const data = await fetchCharactersFromJSON();
      setCharacterData(data);
    };
    loadCharacterData();
  }, []);

  if (!revealed)
    return (
      <div className={styles.emptyRow}>
        <p className={styles.placeholder}>{placeholder}</p>
      </div>
    );
  if (!guess)
    return (
      <div className={styles.emptyRow}>
        <p className={styles.placeholder}>{placeholder}</p>
      </div>
    );

  const getPublisherFromJSON = (characterName, characterFullName) => {
    const character = characterData.find(
      (char) =>
        char.name === characterName && char["full-name"] === characterFullName
    );
    return character ? character.publisher : "Unknown";
  };

  const compareAttribute = (attrPath, isMultiple = false) => {
    const getNestedValue = (obj, path) => {
      return path
        .split(".")
        .reduce((acc, key) => (acc ? acc[key] : undefined), obj);
    };

    let guessValue = getNestedValue(guess, attrPath) || "Unknown";
    let targetValue = getNestedValue(target, attrPath) || "Unknown";

    // Use characters.json for publisher comparison
    if (attrPath === "biography.publisher") {
      guessValue = getPublisherFromJSON(
        guess.name,
        guess.biography["full-name"]
      );
      targetValue = getPublisherFromJSON(
        target.name,
        target.biography["full-name"]
      );
    }

    if (isMultiple) {
      const separators = /[,;]/;
      const guessValues =
        guessValue !== "Unknown"
          ? guessValue.split(separators).map((v) => v.trim())
          : [];
      const targetValues =
        targetValue !== "Unknown"
          ? targetValue.split(separators).map((v) => v.trim())
          : [];

      const match = guessValues.find((value) => targetValues.includes(value));
      if (match) {
        return { result: GuessType.HIT, displayValue: match };
      }

      const randomValue =
        guessValues.length > 0
          ? guessValues[Math.floor(Math.random() * guessValues.length)]
          : "Unknown";
      return { result: GuessType.MISS, displayValue: randomValue };
    }

    if (guessValue === targetValue) {
      return { result: GuessType.HIT, displayValue: guessValue };
    } else {
      return { result: GuessType.MISS, displayValue: guessValue };
    }
  };

  const comparePowerStats = (stat) => {
    const guessStat = parseInt(guess.powerstats[stat]) || "Unknown";
    const targetStat = parseInt(target.powerstats[stat]) || "Unknown";
    if (guessStat === targetStat) {
      return GuessType.HIT;
    }
    if (guessStat > targetStat) {
      return GuessType.LOWER;
    }
    if (guessStat < targetStat) {
      return GuessType.HIGHER;
    }
    return GuessType.MISS;
  };

  const getClassNameForComparison = (comparisonResult) => {
    return comparisonResult === GuessType.HIT
      ? styles.hit
      : comparisonResult === GuessType.MISS
      ? styles.miss
      : comparisonResult === GuessType.HIGHER
      ? styles.higher
      : styles.lower;
  };

  const getIndicator = (comparisonResult) => {
    switch (comparisonResult) {
      case GuessType.HIT:
        return <span className={styles.hitIndicator}>✓</span>;
      case GuessType.MISS:
        return <span className={styles.missIndicator}>✗</span>;
      case GuessType.HIGHER:
        return <span className={styles.higherIndicator}>↑</span>;
      case GuessType.LOWER:
        return <span className={styles.lowerIndicator}>↓</span>;
      default:
        return null;
    }
  };

  const renderCell = (value, comparisonResult) => {
    return (
      <div
        className={`${styles.cell} ${getClassNameForComparison(
          comparisonResult
        )}`}
      >
        <span className={styles.cellText}>{value}</span>
        {getIndicator(comparisonResult)}
      </div>
    );
  };

  return (
    <div className={styles.row}>
      {/* Name - no indicator needed */}
      <div className={styles.cell}>
        <span className={styles.cellText}>{guess.name || "Unknown"}</span>
      </div>

      {/* Publisher */}
      {renderCell(
        getPublisherFromJSON(guess.name, guess.biography["full-name"]),
        compareAttribute("biography.publisher").result
      )}

      {/* Gender */}
      {renderCell(
        guess.appearance.gender === "null" || !guess.appearance.gender
          ? "Unknown"
          : guess.appearance.gender,
        compareAttribute("appearance.gender").result
      )}

      {/* Race */}
      {renderCell(
        guess.appearance.race === "null" || !guess.appearance.race
          ? "Unknown"
          : guess.appearance.race,
        compareAttribute("appearance.race").result
      )}

      {/* Hair Color */}
      {renderCell(
        guess.appearance["hair-color"] === "null" ||
          !guess.appearance["hair-color"]
          ? "Unknown"
          : guess.appearance["hair-color"],
        compareAttribute("appearance.hair-color").result
      )}

      {/* Affiliation */}
      {renderCell(
        compareAttribute("connections.group-affiliation", true).displayValue,
        compareAttribute("connections.group-affiliation", true).result
      )}

      {/* Alignment */}
      {renderCell(
        compareAttribute("biography.alignment", true).displayValue,
        compareAttribute("biography.alignment", true).result
      )}

      {difficulty === "Casual" && (
        <>
          {/* Strength */}
          {renderCell(
            guess.powerstats.strength === "null" || !guess.powerstats.strength
              ? "Unknown"
              : guess.powerstats.strength,
            comparePowerStats("strength")
          )}

          {/* Power */}
          {renderCell(
            guess.powerstats.power === "null" || !guess.powerstats.power
              ? "Unknown"
              : guess.powerstats.power,
            comparePowerStats("power")
          )}

          {/* Intelligence */}
          {renderCell(
            guess.powerstats.intelligence === "null" ||
              !guess.powerstats.intelligence
              ? "Unknown"
              : guess.powerstats.intelligence,
            comparePowerStats("intelligence")
          )}
        </>
      )}
    </div>
  );
};

export default GuessRow;

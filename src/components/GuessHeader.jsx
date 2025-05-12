import styles from "./GuessHeader.module.css";

export const GuessHeader = ({ difficulty }) => {
  return (
    <div className={`${styles.headerRow} ${difficulty.toLowerCase()}`}>
      <div className={styles.headerCell}>
        <span>Character</span>
      </div>
      <div className={styles.headerCell}>
        <span>Publisher</span>
      </div>
      <div className={styles.headerCell}>
        <span>Gender</span>
      </div>
      <div className={styles.headerCell}>
        <span>Race</span>
      </div>
      <div className={styles.headerCell}>
        <span>Hair Color</span>
      </div>
      <div className={styles.headerCell}>
        <span>Affiliation</span>
      </div>
      <div className={styles.headerCell}>
        <span>Alignment</span>
      </div>

      {difficulty === "Casual" && (
        <>
          <div className={styles.headerCell}>
            <span>Strength</span>
          </div>
          <div className={styles.headerCell}>
            <span>Power</span>
          </div>
          <div className={styles.headerCell}>
            <span>Intelligence</span>
          </div>
        </>
      )}
    </div>
  );
};

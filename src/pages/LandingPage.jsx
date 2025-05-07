import { useNavigate } from "react-router-dom";
import styles from "./LandingPage.module.css";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <section className={styles.container}>
      <div className={styles.contentWrapper}>
        <div className={styles.textSection}>
          <p className={styles.header}>Guess That Hero</p>
          <p className={styles.description}>
            The Marvel and DC Character Guessing Game
          </p>
          <p className={styles.smallDescription}>
            Guess That Character in 10 Guesses
          </p>
        </div>
        <button
          className={styles.startButton}
          onClick={() => navigate("/guess")}
        >
          START GAME!
        </button>
      </div>
    </section>
  );
};

export default LandingPage;

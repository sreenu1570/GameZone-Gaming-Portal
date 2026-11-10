
import { useState } from "react";

function GuessNumber() {

  const [number, setNumber] = useState(
    () => Math.floor(Math.random() * 100) + 1
  );

  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState(
    "Guess a number between 1 and 100"
  );

  const [attempts, setAttempts] = useState(0);

  const checkGuess = () => {

    const value = Number(guess);

    if (
      guess.trim() === "" ||
      !Number.isInteger(value) ||
      value < 1 ||
      value > 100
    ) {
      setMessage("Enter a valid number between 1 and 100.");
      return;
    }

    setAttempts((a) => a + 1);

    if (value === number) {

      setMessage("Congratulations! Correct Guess!");

    } else if (value < number) {

      setMessage("Too Low! Try a higher number.");

    } else {

      setMessage("Too High! Try a lower number.");
    }

  };

  const restart = () => {

    setNumber(Math.floor(Math.random() * 100) + 1);
    setGuess("");
    setAttempts(0);
    setMessage("New game started! Guess the number.");

  };

  return (
    <div className="game-card">

      <h1>Number Guessing Game</h1>

      <p>Guess a number between 1 and 100.</p>

      <input
        type="number"
        min="1"
        max="100"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        placeholder="Enter your guess"
      />

      <button onClick={checkGuess}>
        Check Guess
      </button>

      <h3>{message}</h3>

      <p>Attempts: {attempts}</p>

      <button onClick={restart}>
        Restart Game
      </button>

    </div>
  );
}

export default GuessNumber;

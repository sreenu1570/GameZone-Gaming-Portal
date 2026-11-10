
import { useState } from "react";

function RockPaperScissors() {

  const [result, setResult] = useState("Choose your move!");

  const [score, setScore] = useState({
    player: 0,
    computer: 0,
    draw: 0
  });

  const play = (user) => {

    const choices = ["Rock", "Paper", "Scissors"];

    const computer = choices[
      Math.floor(Math.random() * 3)
    ];

    let message;

    if (user === computer) {

      message = "It's a Draw!";

      setScore((s) => ({
        ...s,
        draw: s.draw + 1
      }));

    } else if (
      (user === "Rock" && computer === "Scissors") ||
      (user === "Paper" && computer === "Rock") ||
      (user === "Scissors" && computer === "Paper")
    ) {

      message = "You Win!";

      setScore((s) => ({
        ...s,
        player: s.player + 1
      }));

    } else {

      message = "Computer Wins!";

      setScore((s) => ({
        ...s,
        computer: s.computer + 1
      }));
    }

    setResult(
      `${message} You: ${user} | Computer: ${computer}`
    );
  };

  const reset = () => {
    setScore({ player: 0, computer: 0, draw: 0 });
    setResult("Choose your move!");
  };

  return (
    <div className="game-card">

      <h1>Rock Paper Scissors</h1>

      <button onClick={() => play("Rock")}>
        🪨 Rock
      </button>

      <button onClick={() => play("Paper")}>
        📄 Paper
      </button>

      <button onClick={() => play("Scissors")}>
        ✂️ Scissors
      </button>

      <h3>{result}</h3>

      <h3>Scoreboard</h3>

      <p>Your Wins: {score.player}</p>
      <p>Computer Wins: {score.computer}</p>
      <p>Draws: {score.draw}</p>

      <button onClick={reset}>
        Restart
      </button>

    </div>
  );
}

export default RockPaperScissors;

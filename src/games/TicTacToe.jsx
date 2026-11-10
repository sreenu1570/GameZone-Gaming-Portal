
import { useState } from "react";

function TicTacToe() {

  const [board, setBoard] = useState(Array(9).fill(""));
  const [turn, setTurn] = useState("X");

  const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  const winner = winningPatterns.find(([a, b, c]) =>
    board[a] &&
    board[a] === board[b] &&
    board[b] === board[c]
  );

  const play = (index) => {

    if (board[index] || winner || board.every(Boolean)) {
      return;
    }

    const updated = [...board];

    updated[index] = turn;

    setBoard(updated);

    setTurn(turn === "X" ? "O" : "X");
  };

  const reset = () => {
    setBoard(Array(9).fill(""));
    setTurn("X");
  };

  return (
    <div className="game-card">

      <h1>Tic-Tac-Toe</h1>

      <h3>
        {winner
          ? `Winner: ${board[winner[0]]}`
          : board.every(Boolean)
          ? "It's a Draw!"
          : `Turn: ${turn}`}
      </h3>

      <div className="board">

        {board.map((cell, index) => (

          <button
            key={index}
            onClick={() => play(index)}
          >
            {cell}
          </button>

        ))}

      </div>

      <button onClick={reset}>
        Restart Game
      </button>

    </div>
  );
}

export default TicTacToe;

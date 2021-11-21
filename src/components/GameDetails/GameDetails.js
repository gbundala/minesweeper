import React from "react";
import "./GameDetails.css";

export default function GameDetails({
  restartGame,
  setRestartGame,
  quantityOfBombs,
  setQuantityOfBombs,
  winStatus,
  gameover,
  setShowHelp,
  showHelp,
}) {
  return (
    <div className="game-details-wrapper">
      <h1>Minesweepers Game</h1>

      {winStatus && <h2>Congratulations you have won! 🎉</h2>}
      {gameover && (
        <h2 style={{ color: "palegoldenrod" }}>
          Ooops you have lost! Try again
        </h2>
      )}
      <p>
        Play the Minesweepers Game in the Board above. In case you struggle, you
        may click the help button to get instructions!{" "}
      </p>

      <p>
        You can also restart the game whenever you want. Choose the level that
        you want to play from the drop down menu below. You may want to start at
        the Beginner level if you don't have much experience with Minesweeper
      </p>
      <div className="buttons-wrapper">
        <button
          onClick={() => {
            setRestartGame(!restartGame);
          }}
        >
          Restart Game
        </button>
        <button
          onClick={() => {
            setShowHelp(!showHelp);
          }}
        >
          {showHelp ? "Close Help Box" : "Get Help"}
        </button>
        <select
          onChange={(e) => {
            setQuantityOfBombs(e.target.value);
          }}
          id="gamelevel"
          name="gamelevel"
          value={quantityOfBombs}
        >
          <option value={5}>Beginner</option>
          <option value={15}>Medium</option>
          <option value={30}>Expert</option>
        </select>
      </div>
    </div>
  );
}

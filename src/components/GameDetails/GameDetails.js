import React from "react";
import "./GameDetails.css";

export default function GameDetails({ restartGame, setRestartGame }) {
  return (
    <div className="game-details-wrapper">
      {/* <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
        crossOrigin="anonymous"
      /> */}
      <h1>Minesweepers Game</h1>
      <p>
        Play the Minesweepers Game in the Board above. In case you struggle, you
        may click the help button to get instructions!{" "}
      </p>
      <div className="buttons-wrapper">
        <button
          onClick={() => {
            setRestartGame(!restartGame);
          }}
        >
          Restart Game
        </button>
        <button>Get Help</button>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import "./App.css";
import Board from "./components/Board/Board";
import GameDetails from "./components/GameDetails/GameDetails";
import Help from "./components/Help/Help";

function App() {
  const [restartGame, setRestartGame] = useState(false);
  const [quantityOfBombs, setQuantityOfBombs] = useState(15);
  const [winStatus, setWinStatus] = useState(false);
  const [gameover, setGameover] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  // definition of the width of the grid, as our board has a grid
  // of 10x10 cells in it.
  const gridWidth = 10;

  useEffect(() => {
    setRestartGame(false);
    setQuantityOfBombs(15);
    setWinStatus(false);
  }, []);

  return (
    <div className="App">
      <div>
        <Board
          gridWidth={gridWidth}
          quantityOfBombs={quantityOfBombs}
          restartGame={restartGame}
          setWinStatus={setWinStatus}
          winStatus={winStatus}
          gameover={gameover}
          setGameover={setGameover}
        />
        <GameDetails
          restartGame={restartGame}
          setRestartGame={setRestartGame}
          quantityOfBombs={quantityOfBombs}
          setQuantityOfBombs={setQuantityOfBombs}
          winStatus={winStatus}
          gameover={gameover}
          setShowHelp={setShowHelp}
          showHelp={showHelp}
        />
      </div>
      {showHelp && <Help />}
    </div>
  );
}

export default App;

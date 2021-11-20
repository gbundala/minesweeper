import { useState } from "react";
import "./App.css";
import Board from "./components/Board/Board";
import GameDetails from "./components/GameDetails/GameDetails";

function App() {
  const [restartGame, setRestartGame] = useState(false);
  return (
    <div className="App">
      <Board restartGame={restartGame} />
      <GameDetails restartGame={restartGame} setRestartGame={setRestartGame} />
    </div>
  );
}

export default App;

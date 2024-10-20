import { useState } from "react";
import "./App.css";

function App() {
  const [startGame, setStarGame] = useState(false);
  const handleStartGame = () => {
    setStarGame(!startGame);
  };
  return (
    <div className="app" style={{ display: startGame ? "block" : " flex" }}>
      <div
        className="buttonContainer"
        style={{ display: startGame ? "none" : "black" }}
      >
        <button onClick={handleStartGame}>Start Game</button>
      </div>
    </div>
  );
}

export default App;

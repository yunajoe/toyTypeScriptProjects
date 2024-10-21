import { useState } from "react";
import "./App.css";
import Canvas from "./components/Canvas";
import useAnimate from "./hooks/useAnimate";

function App() {
  const [startGame, setStarGame] = useState(false);
  const animate = useAnimate();
  const handleStartGame = () => {
    setStarGame(!startGame);
    // animate();
  };
  return (
    <div className="app">
      <div
        className="buttonContainer"
        style={{ display: startGame ? "none" : "block" }}
      >
        <button onClick={handleStartGame}>Start Game</button>
      </div>
      <div style={{ display: startGame ? "block" : "none" }}>
        {startGame && <Canvas />}
      </div>
    </div>
  );
}

export default App;

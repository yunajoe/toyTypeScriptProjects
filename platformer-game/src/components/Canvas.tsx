import { useEffect, useRef } from "react";
import useAnimate from "../hooks/useAnimate";
import Player from "./Player";

function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const player = Player();
  const playerObject = new player();
  console.log("player", playerObject);
  const animate = useAnimate();
  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const context = canvas.getContext("2d");
      if (context) {
        playerObject.draw(context);
        animate(context, playerObject);
      }
    }
  }, [playerObject]); // player가 변경될 때마다 다시 그리기

  return <canvas ref={canvasRef} className="bg-white "></canvas>;
}

export default Canvas;

import { useState } from "react";
import "./App.css";

function App() {
  const [totalTime, setTotalTime] = useState(710000);
  const [hour, setHour] = useState("00");
  const [minute, setMinute] = useState("00");
  const [second, setSecond] = useState("00");
  const [miliSecond, setMiliSecond] = useState("00");

  // console.log("토탈타임", totalTime);

  const convertTime = (time: number) => {
    const stringMiliTime = time.toString().padStart(2, "0");
    const stringMilli = stringMiliTime.slice(-2);
    setMiliSecond(stringMilli);

    // for seconds
    let floorTime = Math.floor(time / 100);
    if (floorTime < 60) {
      const stringSeconds = floorTime.toString().padStart(2, "0").slice(-2);
      setSecond(stringSeconds);
    } else {
      floorTime = floorTime % 60;
      const stringSeconds = floorTime.toString().padStart(2, "0").slice(-2);
      setSecond(stringSeconds);
    }

    if (time >= 6000) {
      let floorTime2 = Math.floor(time / 6000);

      if (floorTime2 < 60) {
        const stringMinutes = floorTime2.toString().padStart(2, "0");
        setMinute(stringMinutes);
      } else {
        floorTime2 = floorTime2 % 60;
        const stringMinutes = floorTime2.toString().padStart(2, "0");
        setMinute(stringMinutes);
      }
    }

    if (time >= 360000) {
      let floorTime3 = Math.floor(time / 360000);
      const stringHour = floorTime3.toString().padStart(2, "0");
      setHour(stringHour);
    }
  };
  const handleStart = () => {
    setInterval(() => {
      setTotalTime((prev) => {
        convertTime(prev);
        return prev + 1;
      });
    }, 10);
  };

  return (
    <div>
      <div className="container">
        <h1>{hour}</h1>
        <h1>:</h1>
        <h1>{minute}</h1>
        <h1>:</h1>
        <h1>{second}</h1>
        <h1>:</h1>
        <h1>{miliSecond}</h1>
        <h1>{totalTime}</h1>
      </div>
      <button onClick={handleStart}>START버튼</button>
    </div>
  );
}

export default App;

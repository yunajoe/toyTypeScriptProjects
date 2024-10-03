import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [inputValue, setInputValue] = useState<number>();
  const [binaryValue, setBinaryValue] = useState("");
  const [callValueArr, setCallValueArr] = useState<number[]>([]);
  const [renderValueArr, setRenderValueArr] = useState<number[]>([]);

  const convertDecimalToBinary = (num: number): any => {
    if (num === 0 || num === 1) {
      return String(num);
    }
    let quotient = Math.floor(num / 2);
    setCallValueArr((prev) => [...prev, quotient]);
    return convertDecimalToBinary(quotient) + (num % 2);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setInputValue(value);
  };
  const handleButtonClick = (value: number) => {
    setCallValueArr((prev) => [...prev, value]);
    const binary = convertDecimalToBinary(value);
    setBinaryValue(binary);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (!inputValue) {
        alert("값을 입력해주세요!");
        return;
      }
      if (inputValue < 0) {
        alert("0이상 입력해주세요!");
      }
      setCallValueArr((prev) => [...prev, inputValue]);
      const binary = convertDecimalToBinary(inputValue);
      setBinaryValue(binary);
    }
  };

  console.log("ccc", callValueArr);

  const callStackAnimation = (arr: number[]) => {
    arr.forEach((num: number) => {
      setTimeout(() => {
        console.log("num", num);
        setRenderValueArr((prev) => [num, ...prev]);
      }, 3000);
      console.log("콜스택시작");
    });
  };

  useEffect(() => {
    if (callValueArr.length > 0) {
      callStackAnimation(callValueArr);
    }
  }, [callValueArr]);

  return (
    <>
      <h1>Decimal to Binary Converter </h1>
      <div className="input_container">
        <label htmlFor="decimal_number">Enter a decimal number:</label>
        <input
          type="number"
          id="decimal_number"
          className="input"
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <button
          className="button"
          onClick={() => {
            if (inputValue) {
              handleButtonClick(inputValue);
            }
          }}
        >
          convert
        </button>
        <div className="result">
          <div>{binaryValue}</div>
        </div>
      </div>
      {/* output */}
      <div className="output_container">
        <h1>call stack</h1>
        <div className="output">
          {renderValueArr.map((value) => {
            return <div>{value}</div>;
          })}
        </div>
      </div>
    </>
  );
}

export default App;

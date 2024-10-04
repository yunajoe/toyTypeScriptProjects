import { useEffect, useState } from "react";
import "./App.css";

type Item = {
  callValue: number | string;
  time: number;
};

function App() {
  const [inputValue, setInputValue] = useState<number>();
  const [binaryValue, setBinaryValue] = useState("");
  const [callValueArr, setCallValueArr] = useState<number[]>([]);
  const [renderValueArr, setRenderValueArr] = useState<Item[]>([]);

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
    // setBinaryValue(binary);
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

  // const callStackAnimation = (arr: number[]) => {
  //   setBinaryValue("Call Stack Animation");
  //   let defaultTime = 2000;
  //      //   let text = `decimalTobinary(${value}) returns and gives that value to the stack below. then if pops off the stack`;
  //   arr.forEach((value: number, index: number) => {
  //     let delayTime = defaultTime * (index + 1);
  //     let timeId = setTimeout(() => {
  //       setRenderValueArr((prev) => [value, ...prev]);
  //     }, delayTime);

  //   });
  // };

  const callStackAnimation = (arr: number[]) => {
    setBinaryValue("Call Stack Animation");
    let defaultTime = 2000;

    //   let text = `decimalTobinary(${value}) returns and gives that value to the stack below. then if pops off the stack`;
    arr.forEach((value: number, index: number) => {
      let delayTime = defaultTime * (index + 1);
      setTimeout(() => {
        setRenderValueArr((prev) => [
          {
            callValue: value,
            time: delayTime,
          },
          ...prev,
        ]);
      }, delayTime);
    });
  };

  useEffect(() => {
    if (callValueArr.length > 0) {
      console.log("콜애니메이션");
      callStackAnimation(callValueArr);
    }
  }, [callValueArr]);

  //  renderValuArr

  return (
    <>
      <h1>Decimal to Binary Converter </h1>
      <div className="input_container">
        <label htmlFor="decimal_number">Enter a decimal number:</label>
        <input
          type="number"
          id="decimal_number"
          className="input"
          value={inputValue || ""}
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
          {renderValueArr.map((item, index) => {
            console.log("value", item.callValue);
            return (
              <div className="item" key={index}>
                {item.callValue}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;

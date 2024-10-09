import { useEffect, useState } from "react";
import "./App.css";

type Item = {
  callValue: number | string;
  time: number;
};

function App() {
  const [inputValue, setInputValue] = useState<number>();
  const [binaryValue, setBinaryValue] = useState("");
  const [animationStart, setAnimationStart] = useState(false);

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
    const binaryValue = convertDecimalToBinary(value);
    setBinaryValue(binaryValue);
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

  const callStackAnimation = (arr: number[]) => {
    setAnimationStart(true);

    let defaultTime = 1000;

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

  const changeStack = (arr: Item[]) => {
    if (arr.length === 0) {
      return;
    }
    arr.forEach((_, index) => {
      let maxTime = arr[0].time;
      let delayTime = maxTime + 1000 * (index + 1);

      if (index === 0) {
        setTimeout(() => {
          setRenderValueArr((prev) => {
            return prev.map((prevItem, prevIndex) => {
              if (prevIndex === 0) {
                return {
                  ...prevItem,
                  callValue: `decimalTobinary(${prevItem.callValue}) returns and gives that value to the stack below. then if pops off the stack`,
                };
              }
              return prevItem;
            });
          });
        }, delayTime);

        setTimeout(() => {
          setRenderValueArr((prev) => {
            return prev.filter((_, prevIndex) => prevIndex !== 0);
          });
          setCallValueArr((prev) => {
            return prev.filter((_, prevIndex) => prevIndex !== 0);
          });
        }, delayTime + 1000);
      }
    });
  };

  useEffect(() => {
    if (inputValue) {
      if (inputValue === callValueArr[0]) {
        callStackAnimation(callValueArr);
      }
    }
  }, [callValueArr.length]);

  useEffect(() => {
    if (renderValueArr.length > 0 && callValueArr.length > 0) {
      if (renderValueArr.length === callValueArr.length) {
        changeStack(renderValueArr);
      }
    }
    if (inputValue) {
      if (renderValueArr.length === 0) {
        setAnimationStart(false);
      }
    }
  }, [renderValueArr.length]);

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
          <div>{animationStart ? "Call Stack Animation" : binaryValue}</div>
        </div>
      </div>
      {/* output */}
      <div className="output_container">
        <h1>call stack</h1>
        <div className="output">
          {renderValueArr.map((item, index) => {
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

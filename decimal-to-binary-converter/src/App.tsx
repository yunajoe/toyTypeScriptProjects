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
    setBinaryValue("Call Stack Animation");
    let defaultTime = 2000;

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
      callStackAnimation(callValueArr);
    }
  }, [callValueArr]);

  useEffect(() => {
    if (renderValueArr.length > 0 && callValueArr.length > 0)
      if (renderValueArr.length === callValueArr.length) {
        let maxTime = renderValueArr[0].time;
        renderValueArr.forEach((item, index) => {
          let delayTime = maxTime + 1000 * (index + 1);
          setTimeout(() => {
            setRenderValueArr((prev) => {
              return prev.map((prevItem, prevIndex) => {
                if (prevIndex === index) {
                  return {
                    ...prevItem,
                    callValue: `decimalTobinary(${prevItem.callValue}) returns and gives that value to the stack below. then if pops off the stack`,
                  };
                }
                return prevItem;
              });
            });
          }, delayTime);
        });
      }
  }, [renderValueArr.length]);

  console.log("렌더되는 arr입니다", renderValueArr);

  useEffect(() => {
    if (renderValueArr.length > 0) {
      const isAllString = renderValueArr.every(
        (item) => typeof item.callValue === "string"
      );
      let maxTime = renderValueArr[0].time;
      if (isAllString) {
        renderValueArr.forEach((_, index) => {
          let delayTime = maxTime + 1000 * (index + 1);
          setTimeout(() => {
            setRenderValueArr((prev) => {
              const filterArr = prev.filter((_, prevIndex) => prevIndex !== 0);
              return filterArr;
            });
          }, delayTime + 1000 * (index + 1));
        });
      }
    }
  }, [renderValueArr]);

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

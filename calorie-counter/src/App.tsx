import classNames from "classnames/bind";
import { ChangeEvent, useEffect, useReducer, useRef, useState } from "react";
import styles from "./App.module.scss";
import useInputs from "./hooks/useInputs";
import "react-dropdown/style.css";
import DropDown from "./components/dropdown/DropDown";

const cx = classNames.bind(styles);

function reducer(state: any, action: any) {
  switch (action.type) {
    case "calculate_calorie": {
      return {
        ...state,
        totalOutputCalorie: action.totalOutputCalorie,
      };
    }
    case "selected_menu": {
      return {
        ...state,
        selectedValue: action.selectedValue,
      };
    }
    case "handle_budget": {
      return {
        ...state,
        budgetValue: action.budgetValue,
      };
    }
    default:
      return state;
  }
}
const initialState = {
  totalOutputCalorie: 0,
  selectedValue: "BreakFast",
  budgetValue: "",
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // dropdown관련
  const menus = ["BreakFast", "Lunch", "Dinner", "Snacks", "Exercises"];
  const defaultOption = menus[0];

  // output관련..
  const [isOutPutOpen, setIsOutPutOpen] = useState(false);
  const [totalConsumedCalorie, setTotalConsumedCalorie] = useState(0);
  const [totalBurnedCalorie, setTotalBurnedCalorie] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const { inputNames, addInput, selectedInput, handleChangeValue } = useInputs([
    "BreakFast",
    "Lunch",
    "Dinner",
    "Snacks",
    "Exercises",
  ]);

  // 칼로리 더하는 펑션
  const calculateConsumeCalorie = () => {
    return selectedInput.reduce((acc, input) => {
      if (input.type === "number" && input.id !== "Exercises") {
        acc += Number(input.value);
      }
      return acc;
    }, 0);
  };

  // 칼로리 빼는 펑션
  const calculateBurnedCalorie = () => {
    return selectedInput.reduce((acc, input) => {
      if (input.type === "number" && input.id === "Exercises") {
        acc += Number(input.value);
      }
      return acc;
    }, 0);
  };

  //  총 칼로리 게산하기
  const handleCalculate = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setIsOutPutOpen(true);
    const consumedCalorie = calculateConsumeCalorie();
    const burnedCalorie = calculateBurnedCalorie();

    setTotalConsumedCalorie(consumedCalorie);
    setTotalBurnedCalorie(burnedCalorie);

    const result = Number(state.budgetValue) - consumedCalorie + burnedCalorie;
    dispatch({
      type: "calculate_calorie",
      totalOutputCalorie: result,
    });
  };

  interface InputObjIndex {
    [key: string]: number[];
  }
  const InPutIndex: InputObjIndex = {
    BreakFast: [],
    Lunch: [],
    Dinner: [],
    Snacks: [],
    Exercises: [],
  };

  const handleMenuClick = (menu: string) => {
    dispatch({
      type: "selected_menu",
      selectedValue: menu,
    });
  };

  // input값 추가하기 펑션
  const handleAddEntry = (e: any, selectedMenu: string, idx: number) => {
    e.preventDefault();
    inputNames.map((inputName: string) => {
      if (inputName === selectedMenu) {
        addInput({ idx: idx, inputId: selectedMenu });
      }
    });
  };

  const handleBudget = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "handle_budget",
      budgetValue: e.target.value,
    });
  };

  const dropDownRef = useRef<HTMLDivElement | null>(null);

  const handleOutsideClick = (e: any) => {
    if (dropDownRef.current && !dropDownRef?.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  });
  return (
    <div className={cx("container")}>
      <h1 className={cx("title")}>Calorie Counter</h1>
      <form className={cx("form__container")} id="form">
        <div className={cx("budget__container")}>
          <p>Budget</p>
          <input
            className={cx("budget-input")}
            type="number"
            // min="0"
            placeholder="Daily calorie budget"
            onChange={handleBudget}
            value={state.budgetValue}
            required
          />
        </div>
        {inputNames.map((inputName) => {
          return (
            <div key={inputName}>
              <fieldset className={cx("fieldset")}>
                <legend>{inputName}</legend>
                <div className={cx("new__field")} id="input-field">
                  {selectedInput.map((input, idx) => {
                    if (input.id === inputName) {
                      InPutIndex[inputName].push(idx);
                      const { id, label, type } = input;
                      return (
                        <div key={idx} className={cx("input-container")}>
                          <label>{label}</label>
                          <input
                            id={id}
                            type={type}
                            onBlur={(e) => handleChangeValue(e, input)}
                          />
                        </div>
                      );
                    }
                  })}
                </div>
              </fieldset>
            </div>
          );
        })}
        <div className={cx("controls")}>
          <label className={cx("label")}>Add food or exercise:</label>
          <div
            className={cx("dropdown")}
            ref={dropDownRef}
            onClick={(e) => {
              setIsOpen(!isOpen);
              handleOutsideClick(e);
            }}
          >
            <p>{state.selectedValue}</p>

            {isOpen && (
              <DropDown
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                menus={menus}
                defaultOption={defaultOption}
                handleMenuClick={handleMenuClick}
              />
            )}
          </div>
          <button
            className={cx("add-button")}
            onClick={(e: any) => {
              handleAddEntry(
                e,
                state.selectedValue,
                Math.floor(InPutIndex[state.selectedValue].length / 2) + 1
              );
            }}
          >
            AddEntry
          </button>
        </div>
        <div className={cx("button__container")}>
          <button type="submit" onClick={handleCalculate}>
            Calculate Remaining Calories
          </button>
          <button>Clear</button>
        </div>
      </form>
      {isOutPutOpen && (
        <div className={cx("output-container")}>
          <span className={cx("result")}>
            {state.totalOutputCalorie} Calorie
            {state.totalOutputCalorie > 0 ? "Deficit" : "SurPlus"}
          </span>
          <hr />
          <p>{state.budgetValue} Calories Budgeted</p>
          <p>{totalConsumedCalorie} Calories Consumed</p>
          <p>{totalBurnedCalorie} Calories Burned</p>
        </div>
      )}
    </div>
  );
}

export default App;

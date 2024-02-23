// version1 (각각의 input으로 만든것)

import classNames from "classnames/bind";
import { ChangeEvent, useReducer, useState } from "react";
import styles from "./App.module.scss";
import useInput from "./hooks/useInput";

const cx = classNames.bind(styles);

// type은 어려웡..
function reducer(state: any, action: any) {
  // action과 state는 한 템포의 차이가 있다!
  // console.log("나는야 action", action, "나는야State", state);
  // 여기에 있는 key들이 state.key 로 된다
  // 예를 들어,   totalOutputCalorie: action.totalOutputCalorie 에서 왼쪽이 state.key가 되는것
  // 질문: 왜 ....state,로해야만 정상작동이 되는가..?
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

  const [isClick, setIsClick] = useState(false);

  // output관련..
  const [isOutPutOpen, setIsOutPutOpen] = useState(false);
  const [totalConsumedCalorie, setTotalConsumedCalorie] = useState(0);
  const [totalBurnedCalorie, setTotalBurnedCalorie] = useState(0);

  const Input1 = useInput("BreakFast");
  const Input2 = useInput("Lunch");
  const Input3 = useInput("Dinner");
  const Input4 = useInput("Snack");
  const Input5 = useInput("Exercises");

  const calculateConsumeCalorie = () => {
    const result = Input1.calorieSumFun();
    const result2 = Input2.calorieSumFun();
    const result3 = Input3.calorieSumFun();
    const result4 = Input4.calorieSumFun();
    const totalCalorie = result + result2 + result3 + result4;
    setTotalConsumedCalorie(totalCalorie);
    return totalCalorie;
  };

  const calculateBurnedCalorie = () => {
    const result = Input5.calorieSumFun();
    setTotalBurnedCalorie(result);
    return result;
  };

  //  총 칼로리 게산하기
  const handleCalculate = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setIsOutPutOpen(true);
    const consumedCalorie = calculateConsumeCalorie();
    const burnedCalorie = calculateBurnedCalorie();
    const result = Number(state.budgetValue) - consumedCalorie + burnedCalorie;

    dispatch({
      type: "calculate_calorie",
      totalOutputCalorie: result,
    });
  };

  // handleMenu
  const handleMenuClick = (menu: string) => {
    dispatch({
      type: "selected_menu",
      selectedValue: menu,
    });
  };

  interface InputObjInterface {
    [key: string]: { label: string; type: string }[];
  }
  const InputObj: InputObjInterface = {
    BreakFast: Input1.selectedInput,
    Lunch: Input2.selectedInput,
    Dinner: Input3.selectedInput,
    Snacks: Input4.selectedInput,
    Exercises: Input5.selectedInput,
  };

  const handleAddEntry = (e: any, selectedMenu: string, idx: number) => {
    e.preventDefault();

    if (Input1.InputName === selectedMenu) {
      Input1.addInput(idx);
    }
    if (Input2.InputName === selectedMenu) {
      Input2.addInput(idx);
    }
    if (Input3.InputName === selectedMenu) {
      Input3.addInput(idx);
    }
    if (Input4.InputName === selectedMenu) {
      Input4.addInput(idx);
    }
    if (Input5.InputName === selectedMenu) {
      Input5.addInput(idx);
    }
  };

  const handleBudget = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "handle_budget",
      budgetValue: e.target.value,
    });
  };

  return (
    <div className={cx("container")}>
      <h1 className={cx("title")}>Calorie Counter</h1>
      <form className={cx("form__container")} id="form">
        <div className={cx("budget__container")}>
          <p>Budget</p>
          <input
            className={cx("budget-input")}
            type="number"
            min="0"
            placeholder="Daily calorie budget"
            onChange={handleBudget}
            value={state.budgetValue}
          />
        </div>
        {
          <fieldset className={cx("fieldset")}>
            <legend>BreakFast</legend>
            <div className={cx("new__field")} id="breakfast">
              {Input1.selectedInput.map((input, idx) => {
                const { label, type } = input;
                return (
                  <div key={idx} className={cx("input-container")}>
                    <label>{label}</label>
                    <input
                      type={type}
                      onBlur={(e) => {
                        const calorie = Number(e.target.value);
                        Input1.blurFunc(idx, calorie);
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </fieldset>
        }
        <fieldset className={cx("fieldset")}>
          <legend>Lunch</legend>
          <div className={cx("new__field")} id="lunch">
            {Input2.selectedInput.map((input, idx) => {
              const { label, type } = input;
              return (
                <div key={idx} className={cx("input-container")}>
                  <label>{label}</label>
                  <input
                    type={type}
                    onBlur={(e) => {
                      const calorie = Number(e.target.value);
                      Input2.blurFunc(idx, calorie);
                    }}
                  />
                </div>
              );
            })}
          </div>
        </fieldset>
        <fieldset className={cx("fieldset")}>
          <legend>Dinner</legend>
          <div className={cx("new__field")} id="dinner">
            {Input3.selectedInput.map((input, idx) => {
              const { label, type } = input;
              return (
                <div key={idx} className={cx("input-container")}>
                  <label>{label}</label>
                  <input
                    type={type}
                    onBlur={(e) => {
                      const calorie = Number(e.target.value);
                      Input3.blurFunc(idx, calorie);
                    }}
                  />
                </div>
              );
            })}
          </div>
        </fieldset>
        <fieldset className={cx("fieldset")}>
          <legend>Snacks</legend>
          <div className={cx("new__field")} id="snack">
            {Input4.selectedInput.map((input, idx) => {
              const { label, type } = input;
              return (
                <div key={idx} className={cx("input-container")}>
                  <label>{label}</label>
                  <input
                    type={type}
                    onBlur={(e) => {
                      const calorie = Number(e.target.value);
                      Input4.blurFunc(idx, calorie);
                    }}
                  />
                </div>
              );
            })}
          </div>
        </fieldset>
        <fieldset className={cx("fieldset")}>
          <legend>Exercise</legend>
          <div className={cx("new__field")} id="exercise">
            {Input5.selectedInput.map((input, idx) => {
              console.log("sss", state);
              const { label, type } = input;
              return (
                <div key={idx} className={cx("input-container")}>
                  <label>{label}</label>
                  <input
                    type={type}
                    onBlur={(e) => {
                      const calorie = Number(e.target.value);
                      Input5.blurFunc(idx, calorie);
                    }}
                  />
                </div>
              );
            })}
          </div>
        </fieldset>
        <div className={cx("dropdown__container")}>
          <div className={cx("dropdown")} onClick={() => setIsClick(!isClick)}>
            <p className={cx("dropdown__title")}>Add food or exercise:</p>
            <div className={cx("dropdown")}>
              <p>{state.selectedValue}</p>
              {/* li태그는 element.target.value값이 없다 */}
              {isClick && (
                <ul>
                  <li onClick={() => handleMenuClick("BreakFast")}>
                    Breakfast
                  </li>
                  <li onClick={() => handleMenuClick("Lunch")}>Lunch</li>
                  <li onClick={() => handleMenuClick("Dinner")}>Dinner</li>
                  <li onClick={() => handleMenuClick("Snacks")}>Snacks</li>
                  <li onClick={() => handleMenuClick("Exercises")}>
                    Exercises
                  </li>
                </ul>
              )}
            </div>
          </div>
          {/*인덱스스를, 1, 2...로 하는방법이 없을까유?*/}
          <button
            onClick={(e) =>
              handleAddEntry(
                e,
                state.selectedValue,
                Math.floor(InputObj[state.selectedValue].length / 2) + 1
              )
            }
          >
            AddEntry
          </button>
        </div>
        <div className={cx("button__container")}>
          {/* button의 기본 default type은 submit */}
          {/* form태그 내에서 button을 사용할때 타입 명시가 없다면 기본적으로 submit처리  따라서 새로고침 처리가 된다*/}
          <button type="submit" onClick={handleCalculate}>
            Calculate Remaining Calories
          </button>
          <button>Clear</button>
        </div>
      </form>
      {isOutPutOpen && (
        <div className={cx("output-container")}>
          <span className={cx("result")}>
            {state.totalOutputCalorie}
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

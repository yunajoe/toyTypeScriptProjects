import classNames from "classnames/bind";
import { ChangeEvent, useReducer, useState } from "react";
import styles from "./App.module.scss";
import useInputs from "./hooks/useInputs";

// version2 => input을 array에 담아서 사용하기

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

  const { inputNames, addInput, selectedInput } = useInputs([
    "BreakFast",
    "Lunch",
    "Dinner",
    "Snack",
    "Exercises",
  ]);

  // console.log(InputsArray.inputNames);
  // const Input1 = useInput("BreakFast");
  // const Input2 = useInput("Lunch");
  // const Input3 = useInput("Dinner");
  // const Input4 = useInput("Snack");
  // const Input5 = useInput("Exercises");

  // const calculateConsumeCalorie = () => {
  //   const result = Input1.calorieSumFun();
  //   const result2 = Input2.calorieSumFun();
  //   const result3 = Input3.calorieSumFun();
  //   const result4 = Input4.calorieSumFun();
  //   const totalCalorie = result + result2 + result3 + result4;
  //   setTotalConsumedCalorie(totalCalorie);
  //   return totalCalorie;
  // };

  // const calculateBurnedCalorie = () => {
  //   const result = Input5.calorieSumFun();
  //   setTotalBurnedCalorie(result);
  //   return result;
  // };

  //  총 칼로리 게산하기
  // const handleCalculate = (
  //   e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  // ) => {
  //   e.preventDefault();
  //   setIsOutPutOpen(true);
  //   const consumedCalorie = calculateConsumeCalorie();
  //   const burnedCalorie = calculateBurnedCalorie();
  //   const result = Number(state.budgetValue) - consumedCalorie + burnedCalorie;

  //   dispatch({
  //     type: "calculate_calorie",
  //     totalOutputCalorie: result,
  //   });
  // };

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
    BreakFast: selectedInput,
    Lunch: selectedInput,
    Dinner: selectedInput,
    Snacks: selectedInput,
    Exercises: selectedInput,
  };

  const handleAddEntry = (e: any, selectedMenu: string, idx: number) => {
    e.preventDefault();
    inputNames.map((inputName: string) => {
      if (inputName === selectedMenu) {
        addInput(idx);
      }
    });
  };

  console.log("선택된 메뉴", selectedInput);

  const handleBudget = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "handle_budget",
      budgetValue: e.target.value,
    });
  };
  // 문제 selectedMenu가 change가 되면은 이전에 선택되었떤 input값들이 옮겨간다..
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
        {inputNames.map((inputName) => {
          console.log("나는야 State", state.selectedValue);
          return (
            <div key={inputName}>
              <fieldset className={cx("fieldset")}>
                <legend>{inputName}</legend>
                <div className={cx("new__field")} id="input-field">
                  {inputName === state.selectedValue &&
                    selectedInput.map((input, idx) => {
                      const { label, type } = input;

                      return (
                        <div key={idx} className={cx("input-container")}>
                          <label>{label}</label>
                          <input type={type} />
                        </div>
                      );
                    })}
                </div>
              </fieldset>
            </div>
          );
        })}

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
          <button type="submit">Calculate Remaining Calories</button>
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

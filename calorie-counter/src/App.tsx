import classNames from "classnames/bind";
// https://www.telerik.com/blogs/how-to-programmatically-add-input-fields-react-forms
//TODO: Add Entry 버튼을 누르면은 select 메뉴에 해당하는 input태그안에다가 인풋 2개(name, calorie)를 추가하는 기능

import styles from "./App.module.scss";
import { useRef, useState } from "react";
function App() {
  const cx = classNames.bind(styles);
  const [isClick, setIsClick] = useState(false);

  const [selectedValue, setSelectedValue] = useState("Breakfast");

  const [breakFastInput, setBreakFastInput] = useState([
    {
      label: "",
      type: "",
    },
  ]);
  const [lunChInput, setLunchInput] = useState([
    {
      label: "",
      type: "",
    },
  ]);
  const [dinnerInput, setDinnerInput] = useState([
    {
      label: "",
      type: "",
    },
  ]);
  const [snackInput, setSnackInput] = useState([
    {
      label: "",
      type: "",
    },
  ]);

  const [exerciseInput, setExerciseInput] = useState([
    {
      label: "",
      type: "",
    },
  ]);
  const handleMenuClick = (menu: string) => {
    setSelectedValue(menu);
  };
  const BreakFastRef = useRef<HTMLInputElement>(null);
  const LunchRef = useRef<HTMLInputElement>(null);
  const DinnerRef = useRef<HTMLInputElement>(null);
  const SnackRef = useRef<HTMLInputElement>(null);
  const ExerciseRef = useRef<HTMLInputElement>(null);

  const handleAddEntry = (e: any, id: string, idx: number) => {
    e.preventDefault();
    if (BreakFastRef?.current?.id === id) {
      setBreakFastInput((prev) => [
        ...prev,
        {
          label: `Entry-FoodName-${idx}`,
          type: "text",
        },
        {
          label: `Entry-Calorie-${idx}`,
          type: "number",
        },
      ]);
    }
  };

  return (
    <div className={cx("container")}>
      <h1 className={cx("title")}>Calorie Counter</h1>
      <form className={cx("form__container")} id="form">
        <div className={cx("budget__container")}>
          <p>Budget</p>
          <input
            className={cx("budget__input")}
            type="number"
            min="0"
            placeholder="Daily calorie budget"
          />
        </div>
        <fieldset className={cx("fieldset")}>
          <legend>BreakFast</legend>
          <div className={cx("new__field")} id="breakfast" ref={BreakFastRef}>
            {breakFastInput.map((input) => {
              const { label, type } = input;
              return (
                <>
                  <label>{label}</label>
                  <input type={type} />
                </>
              );
            })}
          </div>
        </fieldset>
        <fieldset className={cx("fieldset")}>
          <legend>Lunch</legend>
          <div className={cx("new__field")} id="lunch" ref={LunchRef}>
            {lunChInput.map((input) => {
              const { label, type } = input;
              return (
                <>
                  <label>{label}</label>
                  <input type={type} />
                </>
              );
            })}
          </div>
        </fieldset>
        <fieldset className={cx("fieldset")}>
          <legend>Dinner</legend>
          <div className={cx("new__field")} id="dinner" ref={DinnerRef}>
            {dinnerInput.map((input) => {
              const { label, type } = input;
              return (
                <>
                  <label>{label}</label>
                  <input type={type} />
                </>
              );
            })}
          </div>
        </fieldset>
        <fieldset className={cx("fieldset")}>
          <legend>Snacks</legend>
          <div className={cx("new__field")} id="snack" ref={SnackRef}>
            {snackInput.map((input) => {
              const { label, type } = input;
              return (
                <>
                  <label>{label}</label>
                  <input type={type} />
                </>
              );
            })}
          </div>
        </fieldset>
        <fieldset className={cx("fieldset")}>
          <legend>Exercise</legend>
          <div className={cx("new__field")} id="exercise" ref={ExerciseRef}>
            {exerciseInput.map((input) => {
              const { label, type } = input;
              return (
                <>
                  <label>{label}</label>
                  <input type={type} />
                </>
              );
            })}
          </div>
        </fieldset>
        <div className={cx("dropdown__container")}>
          <div className={cx("dropdown")} onClick={() => setIsClick(!isClick)}>
            <p className={cx("dropdown__title")}>Add food or exercise:</p>
            {/* 선택되면은, 나오는값 default="default" */}
            <div className={cx("dropdown")}>
              <p>{selectedValue}</p>
              {/* li태그는 element.target.value값이 없다 */}
              {isClick && (
                <ul>
                  <li onClick={() => handleMenuClick("Breakfast")}>
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
          {/*얘 어떻게함? */}
          <button
            onClick={(e) =>
              handleAddEntry(
                e,
                "breakfast",
                Math.floor(breakFastInput.length / 2) + 1
              )
            }
          >
            AddEntry
          </button>
        </div>
        <div className={cx("button__container")}>
          <button>Calculate Remaining Calories</button>
          <button>Clear</button>
        </div>
      </form>
    </div>
  );
}

export default App;

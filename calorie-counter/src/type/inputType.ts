import { SetStateAction } from "react";
// React.Dispatch<SetStateAction<string>>;
export type InputCalorieValue = {
  idx: number;
  calorie: number;
};

export type Input = {
  id: string;
  label: string;
  type: string;
  value: string | number;
  textValue: string;
  calorieValue: number;
  setTextValue: Function;
  setCalorieValue: Function;
};

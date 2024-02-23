import { useEffect, useState } from "react";
import { Input, InputCalorieValue } from "../type/inputType";

function useInputs(inputNames: string[]) {
  const [selectedInput, setSelectedInputs] = useState<Input[]>([]);
  const [selectedInputCalorie, setSelectedInputCalorie] = useState<
    InputCalorieValue[]
  >([]);

  // 인풋 추가 하는 펑션

  const addInput = (idx: number) => {
    setSelectedInputs((prev) => [
      ...prev,
      {
        label: `Entry-${idx}-Name`,
        type: "text",
      },
      {
        label: `Entry-${idx}-Calorie`,
        type: "number",
      },
    ]);
  };

  return {
    inputNames,
    selectedInput,
    addInput,
  };
}

export default useInputs;

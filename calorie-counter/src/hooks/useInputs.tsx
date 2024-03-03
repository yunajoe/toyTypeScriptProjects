import { useState } from "react";
import { Input } from "../type/inputType";

function useInputs(inputNames: string[]) {
  const [selectedInput, setSelectedInputs] = useState<Input[]>([]);

  const addInput = ({ idx, inputId }: { idx: number; inputId: string }) => {
    setSelectedInputs((prev: any) => [
      ...prev,
      {
        id: inputId,
        label: `Entry-${idx}-Name`,
        type: "text",
        value: "",
      },
      {
        id: inputId,
        label: `Entry-${idx}-Calorie`,
        type: "number",
        value: 0,
      },
    ]);
  };

  const handleChangeValue = (
    e: React.ChangeEvent<HTMLInputElement>,
    input: Input
  ) => {
    const result = {
      ...selectedInput.find(
        (item) => item.label === input.label && item.id === input.id
      ),
    };
    result.value = e.target.value;

    setSelectedInputs((prev) => {
      const newArray = prev.map((item: Input) => {
        if (
          result.value &&
          item.id === result.id &&
          item.label === result.label
        ) {
          return {
            ...item,
            value: result.value,
          };
        }
        return item;
      });
      //  newArray가 prev가 된다
      return newArray;
    });
  };

  return {
    inputNames,
    selectedInput,
    addInput,
    handleChangeValue,
  };
}

export default useInputs;

// import { useCallback, useState } from "react";
// import { Input, InputCalorieValue } from "../type/inputType";

// function useInput(InputName: string) {
//   const [selectedInput, setSelectedInput] = useState<Input[]>([]);
//   const [selectedInputCalorie, setSelectedInputCalorie] = useState<
//     InputCalorieValue[]
//   >([]);

//   // 인풋 추가 하는 펑션

//   const addInput = (idx: number) => {
//     setSelectedInput((prev) => [
//       ...prev,
//       {
//         label: `Entry-${idx}-Name`,
//         type: "text",
//       },
//       {
//         label: `Entry-${idx}-Calorie`,
//         type: "number",
//       },
//     ]);
//   };

//   // blur 이벤트 펑션
//   const blurFunc = (idx: number, calorie: number) =>
//     setSelectedInputCalorie((prev: InputCalorieValue[]) => {
//       const copyPrev = [...prev];
//       const existingIndex = copyPrev.findIndex((item) => item.idx === idx);
//       if (existingIndex !== -1) {
//         copyPrev[existingIndex].calorie = calorie;
//       } else {
//         copyPrev.push({ idx: idx, calorie: calorie });
//       }
//       return copyPrev;
//     });

//   // inputCalorie sum 펑션
//   const calorieSumFun = () => {
//     return selectedInputCalorie.reduce((acc, item) => {
//       acc += item.calorie;
//       return acc;
//     }, 0);
//   };

//   return {
//     InputName,
//     selectedInput,
//     setSelectedInput,
//     selectedInputCalorie,
//     addInput,
//     blurFunc,
//     calorieSumFun,
//   };
// }

// export default useInput;

import React from "react";

function useInput() {
  return <div></div>;
}

export default useInput;

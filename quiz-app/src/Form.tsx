import { useEffect, useState } from "react";
import { quizData, returnEachValue, returnToIndex } from "./utils";

function Form() {
  const [selectedValue, setSelectedValue] = useState<null | string>(null);
  const [questionNo, setQuestionNo] = useState(0);
  const [quiz, setQuiz] = useState(quizData[questionNo]);
  const [answerCount, setanswerCount] = useState(0);
  const [isFinal, setIsFinal] = useState(false);

  const { question, answersArr, answer } = returnEachValue(quiz) ?? {};

  const handleChooseAnswer = (e: React.MouseEvent<HTMLUListElement>) => {
    const target = e.target as HTMLInputElement;
    if (answersArr && answer) {
      if (target.value === answersArr[returnToIndex(answer)]) {
        setanswerCount((prev) => prev + 1);
      }

      setSelectedValue(target.value);
    }
  };

  const handleSubmit = () => {
    if (!selectedValue) {
      alert("선택을 해주세요");
      return;
    }

    setQuestionNo((prev) => prev + 1);
  };

  useEffect(() => {
    setQuiz(quizData[questionNo]);
    if (questionNo === quizData.length) {
      setIsFinal(true);
    }
  }, [questionNo]);

  return (
    <div className="bg-white rounded-lg shadow-md w-[660px]overflow-hidden">
      {isFinal ? (
        <div className="bg-gray-200 h-full">
          <h1>설문이 종료되었습니다</h1>
          <p>
            당신의 점수: {answerCount} / {quizData.length}
          </p>
        </div>
      ) : (
        <div className="bg-gray-200 h-full">
          <h1 className="text-4xl">{question}</h1>
          <ul onClick={handleChooseAnswer}>
            {answersArr &&
              answersArr.map((item: string) => (
                <li key={item} className="p-2">
                  <input
                    type="radio"
                    id={item}
                    name="choice"
                    value={item}
                  ></input>
                  <label htmlFor={item}>{item}</label>
                </li>
              ))}
          </ul>
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-[#8e44ad] text-[#fff] border-none block w-full cursor-pointer text-[1.1rem] [font-family:inherit] p-[1.3rem]"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
}

export default Form;

type Object = {
  question: string;
  a: string;
  b: string;
  c: string;
  d: string;
  correct: string;
};
export const quizData = [
  {
    question: "Which language runs in a web browser?",
    a: "Java",
    b: "C",
    c: "Python",
    d: "JavaScript",
    correct: "d",
  },
  {
    question: "What does CSS stand for?",
    a: "Central Style Sheets",
    b: "Cascading Style Sheets",
    c: "Cascading Simple Sheets",
    d: "Cars SUVs Sailboats",
    correct: "b",
  },
  {
    question: "What does HTML stand for?",
    a: "Hypertext Markup Language",
    b: "Hypertext Markdown Language",
    c: "Hyperloop Machine Language",
    d: "Helicopters Terminals Motorboats Lamborginis",
    correct: "a",
  },
  {
    question: "What year was JavaScript launched?",
    a: "1996",
    b: "1995",
    c: "1994",
    d: "none of the above",
    correct: "b",
  },
];

export const returnEachValue = (obj: Object) => {
  if (!obj) return;
  return {
    question: obj.question,
    answersArr: [obj.a, obj.b, obj.c, obj.d],
    answer: obj.correct,
  };
};

export const returnToIndex = (str: string) => {
  if (str === "a") return 0;
  if (str === "b") return 1;
  if (str === "c") return 2;
  return 3;
};

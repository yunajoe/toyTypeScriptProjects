import { todoInput } from "@/components/input/todoInput.css";
import React from "react";

type TodoInputProps = {
  todoValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function TodoInput({ todoValue, onChange }: TodoInputProps) {
  return (
    <input
      className={todoInput}
      type="text"
      value={todoValue}
      onChange={onChange}
    />
  );
}

export default TodoInput;

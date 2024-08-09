import { buttonStyles } from "@/components/button/todobutton.css";
import React from "react";

type TodoButtonProps = {
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

function TodoButton({ text, onClick }: TodoButtonProps) {
  return (
    <button className={buttonStyles} onClick={onClick}>
      {text}
    </button>
  );
}

export default TodoButton;

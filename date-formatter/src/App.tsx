import Todo from "@/components/todo/Todo";
import React from "react";
import DateFormatter from "./components/dateformatter/DateFormatter";
import { appContainerStyles } from "./style.css";
import { AppTheme } from "./theme.css";

const App = () => {
  return (
    <div className={AppTheme}>
      <div className={appContainerStyles}>
        <DateFormatter />
        <Todo />
      </div>
    </div>
  );
};

export default App;

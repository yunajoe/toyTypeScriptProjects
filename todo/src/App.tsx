import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface Todo {
  id: string;
  todo: string;
  completed: boolean;
}

function App() {
  // value 타입이 string이다
  const [value, setValue] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  // React.ChangeEvent: React에서 제공하는 이벤트 객체
  // <HTMLInputElement>: 이벤트를 발생시키는 HTML 요소의 타입
  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  // onClick function이라두 parameter를 전달안 하면은 에러가 안 난다
  //  <button onClick={addTodo}>AddTodo</button>
  const addTodo = (): void => {
    const id = uuidv4();
    setTodos([...todos, { id: id, todo: value, completed: false }]);
    setValue("");
  };

  // onclick function인데 parameter를 전달하면은 Types of parameters 'todo' and 'event' are incompatible. 에레남
  //  <button onClick={completedTodo}>    {todo.completed ? "completed" : "incompleted"}   </button>
  const completedTodo = (todo: Todo): void => {
    todo.completed = true;
    setTodos([...todos, todo]);
  };

  return (
    <div className="App">
      <input type="text" value={value} onChange={handleInputValue} />
      <button onClick={addTodo}>AddTodo</button>
      {todos.map((todo) => (
        <div
          key={todo.id}
          style={{ textDecoration: todo.completed ? "line-through" : "" }}
        >
          {todo.todo}
          {/* <button onClick={completedTodo}> */}
          <button onClick={() => completedTodo(todo)}>
            {todo.completed ? "completed" : "incompleted"}
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;

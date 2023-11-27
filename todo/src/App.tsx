import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface Todo {
  id: string;
  todo: string;
  completed: boolean;
}

function App() {
  const [value, setValue] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  // React.ChangeEvent: React에서 제공하는 이벤트 객체
  // <HTMLInputElement>: 이벤트를 발생시키는 HTML 요소의 타입
  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const addTodo = (): void => {
    const id = uuidv4();
    setTodos([...todos, { id: id, todo: value, completed: false }]);
    setValue("");
  };

  // 1차시도 => setter에다가 안했기 떄문에 App이 실행되지 않아서, input에 값을 넣어줬을떄(APP이 다시 실행되었을떄) completed로 변환이 된다
  // const completedTodo = (todo: Todo): void => {
  //   todo.completed = true;
  // };

  // 2차시도 => 아래처럼 하면은 새롭게 todo가 생긴다
  // const completedTodo = (todo: Todo): void => {
  //   setTodos([...todos, { id: todo.id, todo: todo.todo, completed: true }]);
  // };

  const completedTodo = (todo: Todo) => {
    setTodos((prev) => {
      return prev.map((item) =>
        item.id === todo.id ? { ...item, completed: !todo.completed } : item
      );
    });
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
          <button onClick={() => completedTodo(todo)}>
            {todo.completed ? "completed" : "incompleted"}
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;

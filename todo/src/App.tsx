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
  const [editInputId, setEditInputId] = useState<string | null>(null);
  const [editInputIdArr, setEditInputArr] = useState<Todo[]>([]);
  const [editValue, setEditValue] = useState("");

  const disable = value.trim().length === 0;

  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleEditInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(e.target.value);
  };

  const addTodo = (): void => {
    const id = uuidv4();
    setTodos([...todos, { id: id, todo: value, completed: false }]);
    setValue("");
  };

  const editTodo = (todo: Todo) => {
    setEditInputId(todo.id);

    // 처음
    const lastInputArray = editInputIdArr.at(-1);
    if (!lastInputArray) {
      setEditInputArr([...editInputIdArr, todo]);
    }

    // 그 이후..
    if (lastInputArray && lastInputArray.id !== todo.id) {
      setEditInputArr([todo]);
      setEditValue("");
    }
  };

  const deleteTodo = (todo: Todo) => {
    const copyTodos = [...todos];
    const filteredCopyTodos = copyTodos.filter((item) => item.id !== todo.id);
    setTodos(filteredCopyTodos);
  };

  const handleCancel = () => {
    setEditInputId("");
    setEditValue("");
    setEditInputArr([]);
  };

  const handleSave = (todo: Todo) => {
    const editedTodo = {
      ...todo,
      todo: editValue,
    };
    const copyTodos = [...todos];
    const editedTodoArray = copyTodos.map((item) => {
      if (item.id === todo.id) {
        return editedTodo;
      }
      return item;
    });

    setTodos(editedTodoArray);
    setEditInputId("");
    setEditValue("");
  };

  const completedTodo = (todo: Todo) => {
    setTodos((prev) => {
      return prev.map((item) =>
        item.id === todo.id ? { ...item, completed: !todo.completed } : item
      );
    });
  };

  return (
    <div className="flex justify-center w-screen h-screen bg-slate-300">
      <div className="flex flex-col items-center w-4/5 pt-10 gap-y-6">
        <div className="flex gap-10">
          <input type="text" value={value} onChange={handleInputValue} />
          <button
            disabled={disable}
            onClick={addTodo}
            className={`p-2 border-2 border-solid ${
              disable
                ? "bg-gray-300 border-gray-400 cursor-not-allowed"
                : "bg-blue-500 border-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            AddTodo
          </button>
        </div>
        {todos.map((todo) => (
          <div key={todo.id} className="flex p-1.5 bg-blue-200">
            <li className="flex gap-5 bg-blue-200">
              <div className="flex gap-5">
                <span
                  style={{
                    textDecoration: todo.completed ? "line-through" : "",
                    display: todo.id === editInputId ? "none" : "block",
                  }}
                >
                  {todo.todo}
                </span>
                {todo.id === editInputId && (
                  <input
                    value={editValue}
                    onChange={handleEditInputValue}
                    placeholder={todo.todo}
                  />
                )}
                <button onClick={() => completedTodo(todo)}>
                  {todo.completed ? "completed" : "incompleted"}
                </button>
              </div>
              <button
                className="text-white bg-blue-500"
                onClick={() => deleteTodo(todo)}
              >
                삭제하기
              </button>
              <div>
                <button
                  className="text-white bg-gray-400"
                  onClick={() => editTodo(todo)}
                  style={{
                    display: todo.id === editInputId ? "none" : "block",
                  }}
                >
                  편집하기
                </button>
                {editInputId === todo.id && (
                  <div className="flex gap-x-3">
                    <button
                      className="text-white bg-gray-400"
                      onClick={handleCancel}
                    >
                      취소하기
                    </button>
                    <button
                      className="text-white bg-gray-400"
                      onClick={() => handleSave(todo)}
                    >
                      저장하기
                    </button>
                  </div>
                )}
              </div>
            </li>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

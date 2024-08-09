import TodoButton from "@/components/button/TodoButton";
import TodoInput from "@/components/input/TodoInput";
import {
  createTodoContainerStyles,
  editAndDeleteButtonContainer,
  todoItem,
} from "@/components/todo/todo.css";
import { addTodo, deleteTodo, editTodo } from "@/redux/reducer/todoSlice";
import { RootState } from "@/redux/store";
import React, {
  ChangeEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import type { Dispatch } from "redux";

function Todo() {
  const [todoValue, setTodoValue] = useState("");
  const [todoEditValue, setTodoEditValue] = useState("");
  const [editIndex, setEditIndex] = useState(0);
  const [todoArr, setTodoArr] = useState<any[]>([]);

  const dispatch: Dispatch = useDispatch();
  const todoList = useSelector((state: RootState) => state.todo.todosArr);

  const handleChangeTodoValue = (e: ChangeEvent<HTMLInputElement>) => {
    setTodoValue(e.target.value);
  };

  const handleChangeEditTodoValue = (
    e: ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    setTodoEditValue(e.target.value);
    setEditIndex(idx);
  };
  const handleAddTodo = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      dispatch(addTodo(todoValue));
      setTodoValue("");
    },
    [todoValue]
  );

  const handleEditTodo = useCallback(
    (idx: number) => {
      // todoEditValue는 바뀌는데 todoList[idx]는 그대로인 이유는?
      setEditIndex(idx);
      if (!todoList[idx].isEdit) {
        // 편집기능이 비활성화(편집 input박스 없는경우)
        dispatch(editTodo({ editIdx: idx, todoEditValue: todoList[idx].text }));
      } else {
        // 편집 input박스가 있을경우
        dispatch(editTodo({ editIdx: idx, todoEditValue: todoEditValue }));
      }
    },
    [todoEditValue, todoList]
  );
  const handleDeleteTodo = useCallback(
    (idx: number) => {
      dispatch(deleteTodo(idx));
    },
    [todoValue]
  );
  useEffect(() => {
    setTodoEditValue(todoList[editIndex]?.text);
    setTodoArr(todoList);
  }, [todoList]);
  return (
    <div>
      <div className={createTodoContainerStyles}>
        <TodoInput todoValue={todoValue} onChange={handleChangeTodoValue} />
        <TodoButton onClick={handleAddTodo} text="할일 작성하기" />
      </div>
      <div>
        {todoArr.map(
          (todo, idx) =>
            todo.text !== "" && (
              <div key={idx} className={todoItem}>
                {todo.isEdit ? (
                  <TodoInput
                    todoValue={todoEditValue}
                    onChange={(e) => handleChangeEditTodoValue(e, idx)}
                  />
                ) : (
                  <p>{todo.text}</p>
                )}
                <div className={editAndDeleteButtonContainer}>
                  <TodoButton
                    text="수정하기"
                    onClick={() => handleEditTodo(idx)}
                  />
                  <TodoButton
                    text="삭제하기"
                    onClick={() => handleDeleteTodo(idx)}
                  />
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
}

export default Todo;

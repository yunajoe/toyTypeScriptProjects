import { createSlice } from "@reduxjs/toolkit";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
  isEdit: boolean;
};

interface InitialState {
  todosArr: Todo[];
}

let uniqueID = 0;
const initialState: InitialState = {
  todosArr: [
    {
      id: uniqueID,
      text: "",
      completed: false,
      isEdit: false,
    },
  ],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: ++uniqueID,
        text: action.payload,
        completed: false,
        isEdit: false,
      };
      state.todosArr = [...state.todosArr, newTodo];
    },
    deleteTodo: (state, action) => {
      const deletedIdx = action.payload;
      const filterdArr = state.todosArr.filter((_, idx) => idx !== deletedIdx);
      state.todosArr = [...filterdArr];
    },
    editTodo: (state, action) => {
      const { editIdx, todoEditValue } = action.payload;

      let editTodoTarget = state.todosArr.find((_, idx) => idx === editIdx);
      // true가 됬다는것은 첫번째 수정하기 버튼을 눌러서, 수정할 수 있는 input이 나오는거
      // && todoEditValue.length > 0)
      if (editTodoTarget) {
        const copyArr = [...state.todosArr];
        state.todosArr = copyArr.map((item) => {
          if (item.id === editTodoTarget?.id) {
            if (editTodoTarget.isEdit) {
              const newObj = { ...item, isEdit: false, text: todoEditValue };
              return newObj;
            } else {
              const newObj = { ...item, isEdit: true, text: todoEditValue };
              return newObj;
            }
          }
          return item;
        });
      }
    },
  },
});

export const { addTodo, deleteTodo, editTodo } = todoSlice.actions;

export default todoSlice.reducer;

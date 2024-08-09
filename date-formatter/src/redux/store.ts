import { configureStore } from "@reduxjs/toolkit";

import dateFormatterSliceReducer from "./reducer/dateFormatterSlice";
import todoSliceReducer from "./reducer/todoSlice";

export const store = configureStore({
  reducer: {
    dateformatter: dateFormatterSliceReducer,
    todo: todoSliceReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  dateValue: string;
  formatValue: string;
}

const initialState: InitialState = {
  // new Date객체를 하면은 serializable 에러가 난다
  dateValue: new Date().toString(),
  formatValue: "Day, Month, Year",
};

export const dateFormatterSlice = createSlice({
  name: "dateFormatter",
  initialState,
  reducers: {
    changeFormatter: (state, action) => {
      state.formatValue = action.payload;
    },
  },
});

export const { changeFormatter } = dateFormatterSlice.actions;

export default dateFormatterSlice.reducer;

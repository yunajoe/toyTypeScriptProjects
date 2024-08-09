import { style } from "@vanilla-extract/css";
export const createTodoContainerStyles = style({
  display: "flex",
  justifyContent: "space-between",
  width: "480px",
  marginBottom: "10px",
});

export const todoItem = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: "10px",
  height: "50px",
});

export const editAndDeleteButtonContainer = style({
  display: "flex",
  columnGap: "5px",
});

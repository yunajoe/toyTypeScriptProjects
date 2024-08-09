import { style } from "@vanilla-extract/css";
import { appVars } from "./theme.css";

export const appContainerStyles = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  margin: "auto",
  color: appVars.color.white,
  width: "70%",
});

export const dateFormatterContainerStyles = style({
  width: "55%",
});

export const headContainerStyles = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  columnGap: "20px",
});

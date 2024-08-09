import { style } from "@vanilla-extract/css";
import { appVars } from "../../theme.css";

export const dividerStyles = style({
  width: "60%",
  height: "10px",
  margin: "auto",
  background: appVars.color.yellow,
});

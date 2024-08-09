import { style } from "@vanilla-extract/css";
import { globalVars } from "../../theme.css";

export const dropdownContainerStyles = style({
  marginTop: "50px",
});

export const dropdown = style({
  width: "100%",
  height: "100%",
  padding: "10px",
  fontSize: globalVars.fontSize.medium,
  fontWeight: globalVars.fontWeight.large,
});

export const menu = style({
  textAlign: "center",
});

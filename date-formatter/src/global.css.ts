import { globalStyle } from "@vanilla-extract/css";
import { globalVars } from "./theme.css";

globalStyle("html, body", {
  boxSizing: "border-box",
  fontSize: globalVars.fontSize.medium,
  padding: 0,
  margin: 0,
  backgroundColor: globalVars.backGroundColor.main,
});

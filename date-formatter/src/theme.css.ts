import { createGlobalTheme, createTheme } from "@vanilla-extract/css";

// global
export const globalVars = createGlobalTheme(":root", {
  fontSize: {
    small: "16px",
    medium: "26px",
    large: "32px",
  },
  fontWeight: {
    normal: "400",
    medium: "500",
    large: "700",
  },
  backGroundColor: {
    main: "#0a0a23",
  },
});

// App
export const [AppTheme, appVars] = createTheme({
  color: {
    white: "#ffffff",
    yellow: "#f1be32",
  },
});

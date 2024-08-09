import { createVar, style } from "@vanilla-extract/css";

export const accentVar = createVar();

export const white = style({
  vars: {
    [accentVar]: "#ffffff",
  },
});

export const yellow = style({
  vars: {
    [accentVar]: "#f1be32",
  },
});

export const accentText = style({
  color: accentVar,
});

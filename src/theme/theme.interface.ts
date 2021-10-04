export type Colors =
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "light"
  | "medium"
  | "dark";

export type ColorType = {
  color: string;
  contrast: string;
};

// { primary: {color: string, contrast: string}, secondary: ...}
export type ThemePalette = {
  [k in Colors]: ColorType;
};

export type ThemeBreakpoints = {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
};

export type ThemeTypography = {
  h1: number;
  h2: number;
  h3: number;
  h4: number;
  h5: number;
  h6: number;
  p: number;
};

export interface Theme {
  body: string;
  text: string;
  palette: ThemePalette;
  font: string;
  breakpoints: ThemeBreakpoints;
  typography: ThemeTypography;
}

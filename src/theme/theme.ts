import { createGlobalStyle } from "styled-components";
import { ThemePalette } from ".";
import { Theme } from "./theme.interface";

export const GlobalStyles = createGlobalStyle`

  * {
    font-family: ${({ theme }) => theme.font}, sans-serif;
    margin: 0;
  }

  html, body {
    width: 100vw;
    height: 100%;
    overflow-x: hidden;
  }

  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: background 0.2s ease-in, color 0.2s ease-in;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #root{
    height: 100vh;
  }

  *,
  ::before,
  ::after {
    box-sizing: border-box;
  }
`;

const palette: ThemePalette = {
  primary: {
    color: "#ff6c0e",
    contrast: "#fff",
  },
  secondary: {
    color: "#95e1bf",
    contrast: "#222",
  },
  success: {
    color: "#4CAF50",
    contrast: "#fff",
  },
  error: {
    color: "#f44336",
    contrast: "#fff",
  },
  light: {
    color: "#f5f5f5f",
    contrast: "#222",
  },
  medium: {
    color: "#8a8a8a",
    contrast: "#222",
  },
  dark: {
    color: "#2f2f2f",
    contrast: "#fff",
  },
};

export const lightTheme: Theme = {
  body: "#f1f1f1",
  text: "#121620",
  palette,
  font: "Mulish",
  breakpoints: {
    xs: 576, //Mobile - portrait
    sm: 768, //Mobile - landscape
    md: 992, //Tablet
    lg: 1200, //Desktop
    xl: 1400, //Desktop XL
  },
  typography: {
    h1: 48,
    h2: 36,
    h3: 32,
    h4: 28,
    h5: 22,
    h6: 18,
    p: 15,
  },
};

export const darkTheme: Theme = {
  ...lightTheme,
  body: "#333333",
  text: "#f5f5f5",
};

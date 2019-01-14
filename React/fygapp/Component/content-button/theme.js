import React from 'react';


export const theme = {
  light: {
    foreground: "#ffffff",
    background: "#222222"
  },
  dark: {
    foreground: "#000000",
    background: "#eeeeee"
  }
};

export const ThemeContext = React.createContext(
    theme.dark
)

import { DARK, LIGHT } from "./themes/index";
import { THEMES } from "./types";

export const getTheme = (themeName: string) => {
  switch (themeName) {
    case THEMES.DARK:
      return DARK;
    case THEMES.LIGHT:
      return LIGHT;
    default:
      return LIGHT;
  }
};

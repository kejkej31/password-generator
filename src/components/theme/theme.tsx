import { ReactNode, useState, useMemo, createContext } from "react";
import { ThemeProvider, ThemeOptions, createTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { PaletteMode } from "@mui/material";

const getThemeOptions = (mode: PaletteMode) => {
  return {
    palette: {
      mode,
      ...(mode === "light"
        ? {
            // palette values for light mode
          }
        : {
            // palette values for dark mode
          }),
    },
    components: {
      // Name of the component
      MuiButton: {
        defaultProps: {
          // The props to change the default for.
          variant: "contained",
        },
      },
      MuiButtonGroup: {
        defaultProps: {
          variant: "contained",
        },
      },
    },
  } as const;
};

interface Props {
  children: ReactNode;
}

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export default function ThemeWithDarkMode({ children }: Props) {
  const modeStorageKey = "colorMode";
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const modeFromStorage = localStorage.getItem(modeStorageKey);
  const preferredMode = (modeFromStorage as PaletteMode) ?? (prefersDarkMode ? "dark" : "light");
  const [mode, setMode] = useState<PaletteMode>(preferredMode);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        const newMode = mode === "light" ? "dark" : "light";
        localStorage.setItem(modeStorageKey, newMode);
        setMode(newMode);
      },
    }),
    [mode]
  );

  const theme = useMemo(() => {
    let options = getThemeOptions(mode);
    return createTheme(options);
  }, [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
}

import { CssBaseline } from "@mui/material";
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";
import { createContext, useMemo, useState } from "react";

const PRIMARY = {
  lighter: "#E5D9B6",
  light: "#A9AF7E",
  main: "#A4BE7B",
  dark: "#5F8D4E",
  darker: "#07503f",
  contrastText: "#FFF8EA",
};
const SECONDARY = {
  lighter: "#F7EDDB",
  light: "#DFE8CC",
  main: "#DAE2B6",
  dark: "#CCD6A6",
  darker: "#7FB77E",
  contrastText: "#07503f",
};
const SUCCESS = {
  lighter: "#8B7E74",
  light: "#A77979",
  main: "#815B5B",
  dark: "#704F4F",
  darker: "#472D2D",
  contrastText: "#FFF8EA",
};
const SUCCESS_DARK = {
  lighter: "#212529",
  light: "#343a40",
  main: "#495057",
  dark: "#6c757d",
  darker: "#adb5bd",
  contrastText: "#dee2e6",
};
const SECONDARY_DARK = {
  lighter: "#adb5bd",
  light: "#6c757d",
  main: "#495057",
  dark: "#343a40",
  darker: "#212529",
  contrastText: "#dee2e6",
};
const PRIMARY_DARK = {
  lighter: "#212529",
  light: "#343a40",
  main: "#495057",
  dark: "#6c757d",
  darker: "#212529",
  contrastText: "#dee2e6",
};

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

function ThemeProvider({ children }) {
  const [mode, setMode] = useState("light");
  const themeOptions = (mode) =>
    mode === "light"
      ? {
          palette: {
            primary: PRIMARY,
            secondary: SECONDARY,
            success: SUCCESS,
            background: {
              default: "#f8f8f8",
            },
          },
          text: {
            primary: PRIMARY,
            secondary: SECONDARY,
            success: SUCCESS,
          },
          shape: { borderRadius: 8 },
          typography: {
            button: {
              // Here is where you can customise the button
              fontSize: 15,
              textTransform: "none",
              fontWeight: 700,
            },
          },
          components: {
            // Name of the component
            MuiLink: {
              defaultProps: {
                underline: "hover",
              },
            },
          },
          MuiToggleButton: {
            defaultProps: {
              color: "#000000",
              backgroundColor: "#fefefe",
            },
          },
          background: {
            default: "#f8f8f8",
          },
        }
      : {
          palette: {
            mode: "dark",
            primary: PRIMARY_DARK,
            secondary: SECONDARY_DARK,
            success: SUCCESS_DARK,
            background: {
              default: "#040509",
            },
          },
          text: {
            primary: PRIMARY_DARK,
            secondary: SECONDARY_DARK,
            success: SUCCESS_DARK,
          },
          shape: { borderRadius: 8 },
          typography: {
            button: {
              // Here is where you can customise the button
              fontSize: 15,
              textTransform: "none",
              fontWeight: 700,
            },
          },
          components: {
            // Name of the component
            MuiLink: {
              defaultProps: {
                underline: "hover",
              },
            },
          },
          MuiToggleButton: {
            defaultProps: {
              color: "#000000",
              backgroundColor: "#fefefe",
            },
          },
        };

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );
  const theme = useMemo(() => createTheme(themeOptions(mode)), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default ThemeProvider;

import { CssBaseline } from "@mui/material";
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";

const PRIMARY = {
  lighter: "#E5D9B6",
  light: "#A9AF7E",
  main: "#A4BE7B",
  dark: "#5F8D4E",
  darker: "#07503f",
  contrastText: "#FFF",
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

function ThemeProvider({ children }) {
  const themeOptions = {
    palette: {
      primary: PRIMARY,
      secondary: SECONDARY,
      success: SUCCESS,
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
  };

  const theme = createTheme(themeOptions);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}

export default ThemeProvider;

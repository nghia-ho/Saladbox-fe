import { CssBaseline } from "@mui/material";
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";

const PRIMARY = {
  lighter: "#6a9b90",
  light: "#397a6a",
  main: "#206958",
  dark: "#085946",
  darker: "#07503f ",
  contrastText: "#FFF",
};
const SECONDARY = {
  lighter: "#D6E4FF",
  light: "#84A9FF",
  main: "#08660D",
  dark: "#229A16",
  darker: "#091A7A",
  contrastText: "#FFF",
};
const SUCCESS = {
  lighter: "#E9FCD4",
  light: "#AAF27F",
  main: "#54D62C",
  dark: "#229A16",
  darker: "#08660D",
  contrastText: "#FFF",
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

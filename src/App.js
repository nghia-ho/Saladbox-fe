import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Router from "./routes";
import CssBaseline from "@mui/material/CssBaseline";
import ThemeProvider from "./context/ThemeProvider";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ThemeProvider>
          <Router />
        </ThemeProvider>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;

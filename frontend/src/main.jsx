import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CartProvider } from "./context/CartContext";
import { UserProvider } from "./context/UserContext";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#00e5ff" },
    secondary: { main: "#ff4081" },
    background: { default: "#0b1020", paper: "#111827" },
  },
  shape: { borderRadius: 14 },
  typography: {
    fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial',
    button: { textTransform: "none", fontWeight: 600 },
  },
  components: {
    MuiCard: { styleOverrides: { root: { border: "1px solid rgba(255,255,255,0.08)" } } },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 12 },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </UserProvider>
    </ThemeProvider>
  </React.StrictMode>
);

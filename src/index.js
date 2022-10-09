import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { ThemeProvider } from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";
import { alpha } from "@material-ui/core/styles";
import { AuthProvider } from "./components/contexts/AuthContext";

const theme = createTheme({
  overrides: {
    MuiInputBase: {
      input: {
        color: "#f5f5f5",
        fontFamily: "Montserrat",
        textAlign: "center",
      },
    },
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: "#4B79A5",
      },
    },
    MuiPickersDay: {
      daySelected: {
        backgroundColor: "#4B79A5",
      },
    },
  },
});
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <ThemeProvider theme={theme}>
          <AuthProvider>
          <App />
          </AuthProvider>
        </ThemeProvider>
      </MuiPickersUtilsProvider>
    </BrowserRouter>
  </Provider>
);
reportWebVitals();

import { BrowserRouter } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import MyContextProvider from "./context/MyContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <MyContextProvider>
      <App />
    </MyContextProvider>
  </BrowserRouter>
);

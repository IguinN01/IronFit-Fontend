import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./css/global/reset.css";
import "./css/global/styles.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
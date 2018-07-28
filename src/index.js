import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.jsx";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary.jsx";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
  document.getElementById("root")
);
registerServiceWorker();

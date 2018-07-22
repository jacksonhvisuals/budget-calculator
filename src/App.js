import React, { Component } from "react";
import AppLayout from "./components/AppLayout/AppLayout";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-intro">
          <ErrorBoundary>
            <AppLayout />
          </ErrorBoundary>
        </div>
      </div>
    );
  }
}

export default App;

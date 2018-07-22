import React, { Component } from "react";
import AppLayout from "./components/AppLayout/AppLayout";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-intro">
          <AppLayout />
        </div>
      </div>
    );
  }
}

export default App;

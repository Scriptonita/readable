import React, { Component } from "react";
import { Route } from "react-router-dom";
import "./css/App.css";
import Home from "./containers/Home";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route key="home" exact path="/" render={() => <Home />} />
      </div>
    );
  }
}

export default App;

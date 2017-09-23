import React, { Component } from "react";
import { Route } from "react-router-dom";
import "./css/App.css";
import Home from "./containers/Home";
import Header from "./components/Header";
import Categories from "./components/Categories";
import "./css/Home.css";

const URL = process.env.REACT_APP_API_SERVER;

class App extends Component {
  state = {
    categories: []
  };

  componentDidMount = () => {
    fetch(URL + "/categories", {
      headers: { Authorization: "oki" }
    })
      .then(response => response.json())
      .then(result =>
        this.setState({
          categories: result.categories
        })
      );
  };

  render() {
    const { categories } = this.state;
    return (
      <div className="App">
        <Header />
        <br />
        {categories && <Categories categories={categories} />}
        <br />
        <div className="App">
          <Route key="home" exact path="/" render={() => <Home />} />
        </div>
      </div>
    );
  }
}

export default App;

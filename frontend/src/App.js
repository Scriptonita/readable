import React, { Component } from "react";
import { Route } from "react-router-dom";
import "./css/App.css";
import Home from "./containers/Home";
import Category from "./containers/Category";
import Header from "./components/Header";
import Categories from "./components/Categories";
import "./css/Home.css";

/* URL API-server */
const URL = process.env.REACT_APP_API_SERVER;

/**
* @function App
* @description  - Main function
* @param {function} handleSort  - Controller for sort posts
* @param {array} categories - Posts collection
* @param {string} sort  - Property used to sort posts
*/

class App extends Component {
  state = {
    categories: [],
    sort: "voteScore"
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

  handleSort = sort => {
    this.state.sort !== sort && this.setState({ sort: sort });
  };

  render() {
    const { categories } = this.state;
    return (
      <div className="App">
        <Header />
        <br />
        {categories && (
          <Categories
            categories={categories}
            sort={this.handleSort}
            sorted={this.state.sort}
          />
        )}
        <br />
        <div className="App">
          <Route
            key="home"
            exact
            path="/"
            render={() => <Home sort={this.state.sort} />}
          />
          <Route
            key="category"
            path="/:category"
            component={Category}
            sort={this.state.sort}
          />
        </div>
      </div>
    );
  }
}

export default App;

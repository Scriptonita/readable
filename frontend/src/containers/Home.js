import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../logo.svg";
import "../css/Home.css";

const URL = "http://localhost:3001";

class Home extends Component {
  state = {
    categories: [],
    posts: []
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
    fetch(URL + "/posts", {
      headers: { Authorization: "doki" }
    })
      .then(response => response.json())
      .then(result =>
        this.setState({
          posts: result
        })
      );
  };

  listCategories = () => {
    console.log("Entroo");
    this.state.categories.map(category => {
      return (
        <div key={category.name}>
          <Link to={{ pathname: "/" + category.path + "/posts" }}>
            {category.name}
          </Link>
        </div>
      );
    });
    console.log("Salgoo");
  };

  render() {
    const { categories, posts } = this.state;
    return (
      <div className="Home">
        <div className="Home-header">
          <img src={logo} className="Home-logo" alt="logo" />
          <h2>Welcome to VeoMamoneo</h2>
        </div>
        <p className="Home-intro">Categories</p>
        {categories &&
          categories.map(category => {
            return (
              <div key={category.name}>
                <Link to={{ pathname: "/" + category.path + "/posts" }}>
                  {category.name}
                </Link>
              </div>
            );
          })}
        <br />
        {posts &&
          posts.map(post => {
            return (
              <div key={post.id}>
                author: {post.author}
                <br />
                body: {post.body}
                <br />
                ---------------------------------
              </div>
            );
          })}
      </div>
    );
  }
}

export default Home;

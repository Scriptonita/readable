import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import "./css/App.css";
import Home from "./containers/Home";
import Category from "./containers/Category";
import Post from "./containers/Post";
import CommentEdit from "./containers/CommentEdit";
import NewPost from "./containers/NewPost";
import PostEdit from "./containers/PostEdit";
import Header from "./components/Header";
import Categories from "./components/Categories";
import "./css/Home.css";
import { getAllCategories } from "./actions";
import { Grid, Row, Col } from "react-bootstrap";

/* URL API-server */
const URL = process.env.REACT_APP_API_SERVER;
const HEADER = process.env.REACT_APP_API_HEADER;

/**
* @function App
* @description  - Main function, depending on URL we get a functionallity
* @method {function} componentDidMount  - Get all categories
*/

class App extends Component {
  componentDidMount = () => {
    fetch(URL + "/categories", {
      headers: { Authorization: HEADER }
    })
      .then(response => response.json())
      .then(result => this.props.allCategories(result));
  };

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <br />
          <Grid>
            <Row>
              <Col xs={10} xsOffset={1} md={8} mdOffset={2}>
                <Categories />
                <br />
                <Route key="home" exact path="/" render={() => <Home />} />
                <Route key="post" exact path="/posts/:id" component={Post} />
                <Route key="create" exact path="/create" component={NewPost} />
                <Route key="edit" exact path="/edit/:id" component={PostEdit} />
                <Route
                  key="category"
                  exact
                  path="/:category"
                  component={Category}
                  sort={this.props.sort}
                />
                <Route
                  key="editComment"
                  exact
                  path="/comments/edit/:id"
                  component={CommentEdit}
                />
              </Col>
            </Row>
          </Grid>
        </div>
      </BrowserRouter>
    );
  }
}

function mapStateToProps({ posts, categories }) {
  return {
    sorted: posts.sorted,
    categories: categories.categories
  };
}

function mapDispatchToProps(dispatch) {
  return {
    allCategories: data => dispatch(getAllCategories(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

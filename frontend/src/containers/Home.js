import React, { Component } from "react";
import { connect } from "react-redux";
import PostPreview from "../components/PostPreview";
import sortPosts from "../utils/Sort.js";
import { getAll, actualCategory } from "../actions";
import { Grid, Row, Col, Well } from "react-bootstrap";

const URL = process.env.REACT_APP_API_SERVER;
const HEADER = process.env.REACT_APP_API_HEADER;

/** @function
* @name Home
* @description - Funtionallity to show all post
* @props {array} posts - Posts Collection of all posts from Store
* @props {string} sort - property selected for sort posts
* @props {function} getPosts - Fetch posts to Store
*/

class Home extends Component {
  componentDidMount = () => {
    fetch(URL + "/posts", {
      headers: { Authorization: HEADER }
    })
      .then(response => response.json())
      .then(result => this.props.getPosts(result));
    this.props.actualCategory("All");
  };

  render() {
    const posts = sortPosts(this.props.posts, this.props.sorted);
    return (
      <div className="Home">
        {posts &&
          posts.map(
            post =>
              !post.deleted && (
                <PostPreview
                  key={post.id}
                  post={post}
                  sorted={this.props.sorted}
                />
              )
          )}
        {!posts && <div>There are not posts</div>}
      </div>
    );
  }
}

function mapStateToProps({ posts }) {
  return {
    posts: posts.posts,
    sorted: posts.sorted
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getPosts: posts => dispatch(getAll(posts)),
    actualCategory: actual => dispatch(actualCategory(actual))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

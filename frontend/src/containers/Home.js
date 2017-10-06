import React, { Component } from "react";
import { connect } from "react-redux";
import PostPreview from "./PostPreview";
import sortPosts from "../utils/Sort.js";
import { getAll, actualCategory } from "../actions";

const URL = process.env.REACT_APP_API_SERVER;
const HEADER = process.env.REACT_APP_API_HEADER;

/** @function
* @name Home
* @description - Funtionallity to show all post
* @props {array} posts - Posts Collection of all posts from Store
* @props {string} sort - property selected for sort posts
* @props {function} getPosts - dispatch getAll action
* @props {function} actualCategory - dispatch actualCategory action
* @method getAllPosts - get all post from server and save in store
*/

class Home extends Component {
  componentDidMount = () => {
    this.getAllPosts();
    this.props.actualCategory("All");
  };

  getAllPosts = () => {
    fetch(URL + "/posts", {
      headers: { Authorization: HEADER }
    })
      .then(response => response.json())
      .then(result => this.props.getPosts(result));
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
                  voted={this.getAllPosts}
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

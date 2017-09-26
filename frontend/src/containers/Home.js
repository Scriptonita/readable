import React, { Component } from "react";
import { connect } from "react-redux";
import PostPreview from "../components/PostPreview";
import PropTypes from "prop-types";
import sortPosts from "../utils/Sort.js";
import { getAll } from "../actions";

const URL = process.env.REACT_APP_API_SERVER;

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
      headers: { Authorization: "doki" }
    })
      .then(response => response.json())
      .then(result => this.props.getPosts(result));
  };

  render() {
    let posts = sortPosts(this.props.posts, this.props.sorted);
    return (
      <div className="Home">
        {posts &&
          posts.map(post => {
            return (
              <PostPreview
                key={post.id}
                post={post}
                sorted={this.props.sorted}
              />
            );
          })}
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
    getPosts: posts => dispatch(getAll(posts))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

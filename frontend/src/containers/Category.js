import React, { Component } from "react";
import { connect } from "react-redux";
import PostPreview from "../components/PostPreview";
import PropTypes from "prop-types";
import sortPosts from "../utils/Sort.js";
import { getPostFromCategory } from "../actions";

const URL = process.env.REACT_APP_API_SERVER;

/** @function
* @name Category
* @description - Funtionallity to show a list of post from a category
* @method {function} getCategoryPosts - Get posts from a category
* @param {array} posts - Posts Collection from a category
*/

class Category extends Component {
  componentDidMount = () => {
    this.getCategoryPosts(this.props.match.params.category);
  };

  getCategoryPosts = category => {
    fetch(URL + "/" + category + "/posts", {
      headers: { Authorization: "doki" }
    })
      .then(response => response.json())
      .then(result => {
        console.log("REsult: ", result);
        this.props.getPosts(result);
      });
  };

  render() {
    const { posts, sorted } = this.props;
    this.getCategoryPosts(this.props.match.params.category);
    return (
      <div>
        {posts &&
          posts.map(post => {
            return <PostPreview key={post.id} post={post} sorted={sorted} />;
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
    getPosts: posts => dispatch(getPostFromCategory(posts))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);

import React, { Component } from "react";
import { connect } from "react-redux";
import PostPreview from "../components/PostPreview";
import sortPosts from "../utils/Sort.js";
import { getPostFromCategory, actualCategory } from "../actions";

const URL = process.env.REACT_APP_API_SERVER;

/** @function
* @name Category
* @description - Funtionallity to show a list of post from a category
* @method {function} getCategoryPosts - Get posts from a category
* @props {array} posts - Posts Collection from a category
* @props {string} sort - property selected for sort posts
* @props {function} getPosts - Set posts to Store
*/

class Category extends Component {
  componentDidMount = () => {
    this.getCategoryPosts(this.props.match.params.category);
    this.props.actualCategory(this.props.match.params.category);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.category !== this.props.match.params.category) {
      this.props.actualCategory(nextProps.match.params.category);
      this.getCategoryPosts(nextProps.match.params.category);
    }
  }

  getCategoryPosts = category => {
    fetch(URL + "/" + category + "/posts", {
      headers: { Authorization: "doki" }
    })
      .then(response => response.json())
      .then(result => {
        this.props.getPosts(result);
      });
  };

  render() {
    const { posts, sorted } = this.props;
    let postsSorted = sortPosts(posts, sorted);
    return (
      <div>
        {postsSorted &&
          postsSorted.map(post => {
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
    getPosts: posts => dispatch(getPostFromCategory(posts)),
    actualCategory: actual => dispatch(actualCategory(actual))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);

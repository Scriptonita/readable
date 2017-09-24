import React, { Component } from "react";
import PostPreview from "../components/PostPreview";
import PropTypes from "prop-types";
import sortPosts from "../utils/Sort.js";

const URL = process.env.REACT_APP_API_SERVER;

/** @function
* @name Home
* @description - Funtionallity to show all post
* @param {array} posts - Posts Collection of all posts
* @props {string} sort - property selected for sort posts
*/

class Home extends Component {
  state = {
    posts: []
  };

  componentDidMount = () => {
    fetch(URL + "/posts", {
      headers: { Authorization: "doki" }
    })
      .then(response => response.json())
      .then(result => {
        this.setState({
          posts: result
        });
      });
  };

  render() {
    let posts = sortPosts(this.state.posts, this.props.sort);
    return (
      <div className="Home">
        {posts &&
          posts.map(post => {
            return (
              <PostPreview key={post.id} post={post} sorted={this.props.sort} />
            );
          })}
        {!posts && <div>There are not posts</div>}
      </div>
    );
  }
}

Home.propTypes = {
  sort: PropTypes.string.isRequired
};

export default Home;

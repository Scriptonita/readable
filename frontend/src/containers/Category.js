import React, { Component } from "react";
import PostPreview from "../components/PostPreview";
import PropTypes from "prop-types";
import sortPosts from "../utils/Sort.js";

const URL = process.env.REACT_APP_API_SERVER;

class Category extends Component {
  state = {
    posts: []
  };

  componentDidMount = () => {
    this.getCategoryPosts(this.props.match.params.category);
  };

  componentWillReceiveProps = nextProps => {
    this.getCategoryPosts(nextProps.match.params.category);
  };

  getCategoryPosts = category => {
    fetch(URL + "/" + category + "/posts", {
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
    const { posts } = this.state;
    //let posts = this.getCategoryPosts();
    return (
      <div>
        {posts &&
          posts.map(post => {
            return <PostPreview key={post.id} post={post} sorted="voteScore" />;
          })}
        {!posts && <div>There are not posts</div>}
      </div>
    );
  }
}

export default Category;

import React, { Component } from "react";
import PostPreview from "../components/PostPreview";
import PropTypes from "prop-types";

const URL = process.env.REACT_APP_API_SERVER;

class Category extends Component {
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
        this.sortPosts();
      });
  };

  sortPosts = (posts, sort) => {
    console.log("Entro");
    switch (sort) {
      case "voteScore":
        posts.sort(function(a, b) {
          return b.voteScore - a.voteScore;
        });
        console.log("Sort by Votes");
        break;
      case "timestamp":
        posts.sort(function(a, b) {
          return b.timestamp - a.timestamp;
        });
        console.log("Sort by TimeStamp");
        break;
      default:
        break;
    }
    return posts;
  };

  render() {
    let posts = this.sortPosts(this.state.posts, this.props.sort);
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

Category.propTypes = {
  sort: PropTypes.string.isRequired
};

export default Category;

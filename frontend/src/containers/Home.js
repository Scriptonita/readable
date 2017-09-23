import React, { Component } from "react";
import PostPreview from "../components/PostPreview";

const URL = process.env.REACT_APP_API_SERVER;

class Home extends Component {
  state = {
    posts: []
  };

  componentDidMount = () => {
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

  render() {
    const { posts } = this.state;
    return (
      <div className="Home">
        <br />
        {posts &&
          posts.map(post => {
            return <PostPreview key={post.id} post={post} />;
          })}
        {!posts && <div>No hay posts</div>}
      </div>
    );
  }
}

export default Home;

import React, { Component } from "react";
import PostPreview from "../components/PostPreview";
import PropTypes from "prop-types";
import { Button, Grid, Row, Col } from "react-bootstrap";

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
        <Grid>
          <Row>
            <Col xs={2} ms={2}>
              <Button>New</Button>
            </Col>
            <Col xs={3} xsOffset={7} ms={3} msOffset={7}>
              <p
                style={{ textAlign: "right", fontSize: "0.8em", width: "90%" }}
              >
                Order by {this.props.sort}
              </p>
            </Col>
          </Row>
        </Grid>

        {posts &&
          posts.map(post => {
            return <PostPreview key={post.id} post={post} />;
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

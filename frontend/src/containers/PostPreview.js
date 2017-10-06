import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Grid, Row, Col, Well } from "react-bootstrap";
import PropTypes from "prop-types";
import timeConverter from "../utils/Functions";
import "../css/Post.css";
import { postVoteUp, postVoteDown } from "../actions";
import Votes from "../components/Votes.js";

const URL = process.env.REACT_APP_API_SERVER;
const HEADER = process.env.REACT_APP_API_HEADER;

const styles = {
  voteSort: {
    textAlign: "center",
    color: "orange"
  },
  notVoteSort: {
    textAlign: "center"
  },
  voteTimestamp: {
    color: "orange"
  }
};

/**
* @function PostPreview
* @Description - Show a post preview
* @props {object} post - post data
* @props {string} sorted - Property selected for sort
*/

class PostPreview extends Component {
  state = {
    comments: null
  };

  componentDidMount = () => {
    this.getCommentsPost();
  };

  vote = (id, option) => {
    return fetch(URL + "/posts/" + id, {
      headers: {
        Authorization: HEADER,
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        option: option
      })
    });
  };

  votePostUp = id => {
    this.vote(id, "upVote")
      .then(res => this.props.voteUp())
      .then(res => {
        this.props.voted();
      })
      .catch(error => console.log("Error al votar: ", error));
  };

  votePostDown = id => {
    this.vote(id, "downVote")
      .then(res => {
        this.props.voteDown();
      })
      .then(res => {
        this.props.voted();
      })
      .catch(error => console.log("Error al votar: ", error));
  };

  getCommentsPost = () => {
    const { post } = this.props;
    fetch(URL + "/posts/" + post.id + "/comments", {
      headers: { Authorization: HEADER }
    })
      .then(response => response.json())
      .then(result => {
        this.setState({
          comments: result.length
        });
      })
      .catch(error => console.log("Error getting comments"));
  };

  render() {
    const { post, sorted } = this.props;
    const { comments } = this.state;
    return (
      <div className="post" key={post.id}>
        <Grid>
          <Row>
            <Col xs={4} md={3}>
              <Votes
                id={post.id}
                votes={post.voteScore}
                voteUp={this.votePostUp}
                voteDown={this.votePostDown}
                sorted={sorted}
              />
              <p style={{ textAlign: "left" }}>
                {"(" + comments + ") Comments"}
              </p>
            </Col>
            <Col xs={8} md={9}>
              <Row>
                <Col xs={12} md={12}>
                  <Link
                    to={{ pathname: "/posts/" + post.id }}
                    style={{ color: "white" }}
                  >
                    <h3 style={{ color: "black" }}>{post.title}</h3>
                  </Link>
                  <p style={{ fontSize: "0.9em", textAlign: "right" }}>
                    <b>
                      <i>By </i>
                    </b>
                    {post.author}
                  </p>
                  <p style={{ fontSize: "0.9em", textAlign: "right" }}>
                    <b>
                      <i> on </i>
                    </b>
                    <Link to={{ pathname: "/" + post.category + "/posts" }}>
                      {post.category}
                    </Link>
                  </p>
                  <p style={{ fontSize: "0.9em", textAlign: "right" }}>
                    <b>
                      <i> at </i>
                    </b>
                    <span
                      style={
                        sorted === "timestamp" ? styles.voteTimestamp : null
                      }
                    >
                      {timeConverter(post.timestamp)}
                    </span>
                  </p>
                </Col>
              </Row>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

PostPreview.propTypes = {
  post: PropTypes.object.isRequired
};

function mapStateToProps({ posts }) {
  return {
    sorted: posts.sorted
  };
}

function mapDispatchToProps(dispatch) {
  return {
    voteUp: () => dispatch(postVoteUp()),
    voteDown: () => dispatch(postVoteDown())
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(PostPreview);

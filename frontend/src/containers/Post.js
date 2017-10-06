import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getPost, getComments, postVoteUp, postVoteDown } from "../actions";
import { Row, Col, Glyphicon } from "react-bootstrap";
import timeConverter from "../utils/Functions";
import Comments from "./Comments";
import Votes from "../components/Votes.js";
import AddComment from "./AddComment";
import "../css/Post.css";

const URL = process.env.REACT_APP_API_SERVER;
const HEADER = process.env.REACT_APP_API_HEADER;

/** @function
* @name Post
* @description - Funtionallity to show a Post detail view
* @props {object} post - A Post details
* @props {function} getPost - dispatch getPost action
* @props {function} getComments - dispatch getComments action
* @props {function} voteUp - dispatch postVoteUp action
* @props {function} voteDown - dispatch postVoteDown action
* @method getPostDetails - Get post from server and put it in store
* @method getCommentsPost - Get comment from server and put in store
* @method vote - send a vote to server
* @method voteUp - controller for vote up
* @method voteDown - controller for vote down
*/

class Post extends Component {
  componentDidMount = () => {
    this.getPostDetails(this.props.match.params.id);
    this.getCommentsPost();
  };

  getPostDetails = id => {
    fetch(URL + "/posts/" + id, {
      headers: { Authorization: HEADER }
    })
      .then(response => response.json())
      .then(result => {
        this.props.getPost(result);
      });
  };

  getCommentsPost = () => {
    fetch(URL + "/posts/" + this.props.match.params.id + "/comments", {
      headers: { Authorization: HEADER }
    })
      .then(response => response.json())
      .then(result => {
        this.props.getComments(result);
      });
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
      .then(res => {
        this.getPostDetails(id);
        this.props.voteUp();
      })
      .catch(error => console.log("Error al votar: ", error));
  };

  votePostDown = id => {
    this.vote(id, "downVote")
      .then(res => {
        this.getPostDetails(id);
        this.props.voteDown();
      })
      .catch(error => console.log("Error al votar: ", error));
  };

  render() {
    const { post } = this.props;
    console.log("POST: ", post);
    return (
      <div className="post">
        {post && (
          <div>
            <Row>
              <Col xs={12} md={12} style={{ textAlign: "right" }}>
                <Link to={{ pathname: "/edit/" + post.id }}>
                  <Glyphicon glyph="pencil" />
                </Link>
              </Col>
            </Row>
            <Row>
              <Col xs={4} md={3}>
                <Votes
                  id={post.id}
                  votes={post.voteScore}
                  voteUp={this.votePostUp}
                  voteDown={this.votePostDown}
                />
              </Col>
              <Col xs={8} md={9}>
                <h3 style={{ color: "black" }}>{post.title}</h3>
                <p style={{ fontSize: "0.9em" }}>
                  By {post.author} at {timeConverter(post.timestamp)}
                </p>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={12}>
                <p>{post.body}</p>
              </Col>
            </Row>
            <br />
            <Row>
              <Col xs={12} md={12}>
                <Comments
                  id={this.props.match.params.id}
                  voted={this.getCommentsPost}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={12}>
                <AddComment
                  id={this.props.match.params.id}
                  added={this.getCommentsPost}
                />
              </Col>
            </Row>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps({ posts }) {
  return {
    post: posts.posts[0]
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getPost: post => dispatch(getPost(post)),
    getComments: comments => dispatch(getComments(comments)),
    voteUp: () => dispatch(postVoteUp()),
    voteDown: () => dispatch(postVoteDown())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);

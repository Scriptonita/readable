import React, { Component } from "react";
import { connect } from "react-redux";
import { getPost, getComments, postVoteUp, postVoteDown } from "../actions";
import { Grid, Row, Col } from "react-bootstrap";
import timeConverter from "../utils/Functions";
import Comments from "./Comments";
import Votes from "../components/Votes.js";

const URL = process.env.REACT_APP_API_SERVER;
const HEADER = process.env.REACT_APP_API_HEADER;

/** @function
* @name Post
* @description - Funtionallity to show a Post detail view
* @props {object} post - A Post details
* @props {function} getPost - Get post details from store
*/

class Post extends Component {
  componentDidMount = () => {
    this.getPostDetails(this.props.match.params.id);
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
    return (
      <div>
        {post && (
          <Grid>
            <Row>
              <Col xs={10} xsOffset={1} md={8} mdOffset={2}>
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
                    <Comments id={this.props.match.params.id} />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Grid>
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

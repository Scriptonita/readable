import React, { Component } from "react";
import { connect } from "react-redux";
import { getPost, getComments, postVoteUp, postVoteDown } from "../actions";
import {
  Panel,
  Media,
  Button,
  Grid,
  Row,
  Col,
  Well,
  Glyphicon
} from "react-bootstrap";
import timeConverter from "../utils/Functions";
import Comments from "./Comments";

const URL = process.env.REACT_APP_API_SERVER;
const HEADER = process.env.REACT_APP_API_HEADER;

/** @function
* @name Post
* @description - Funtionallity to show a Post detail view
* @props {object} post - A Post details
* @props {function} getPost - Get post details from store
*/

class Post extends Component {
  state = {
    post: null,
    comments: null
  };

  componentDidMount = () => {
    fetch(URL + "/posts/" + this.props.match.params.id, {
      headers: { Authorization: HEADER }
    })
      .then(response => response.json())
      .then(result => {
        this.props.getPost(result);
      });
    fetch(URL + "/posts/" + this.props.match.params.id + "/comments", {
      headers: { Authorization: HEADER }
    })
      .then(response => response.json())
      .then(result => {
        this.props.getComments(result);
      });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.posts !== this.props.posts) {
      nextProps.posts.map(post =>
        this.setState({
          post: post
        })
      );
    }
    if (nextProps.comments !== this.props.comments) {
      this.setState({
        comments: nextProps.comments
      });
    }
  }

  votePostUp = () => {
    let { post } = this.state;
    post.voteScore++;
    this.setState({
      post: post
    });
    fetch(URL + "/posts/" + post.id, {
      headers: {
        Authorization: HEADER,
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        option: "upVote"
      })
    })
      .then(res => console.log(this.props.voteUp()))
      .catch(error => console.log("Error al votar: ", error));
  };

  votePostDown = () => {
    let { post } = this.state;
    post.voteScore--;
    this.setState({
      post: post
    });
    fetch(URL + "/posts/" + post.id, {
      headers: {
        Authorization: HEADER,
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        option: "downVote"
      })
    })
      .then(res => console.log(this.props.voteDown()))
      .catch(error => console.log("Error al votar: ", error));
  };

  render() {
    const { post, comments } = this.state;
    return (
      <div>
        {post && (
          <Grid>
            <Row>
              <Col xs={10} xsOffset={1} md={8} mdOffset={2}>
                <Row>
                  <Col xs={4} md={3}>
                    <Well style={{ textAlign: "center" }}>
                      <Row>
                        <h4>{post.voteScore}</h4>
                        <h6>Votes</h6>
                      </Row>
                      <Row style={{ textAlign: "center" }}>
                        <Col xs={6} md={6}>
                          <Glyphicon
                            glyph="arrow-up"
                            onClick={this.votePostUp}
                          />
                        </Col>
                        <Col xs={6} md={6}>
                          <Glyphicon
                            glyph="arrow-down"
                            onClick={this.votePostDown}
                          />
                        </Col>
                      </Row>
                    </Well>
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
                    <Comments id={post.id} />
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

function mapStateToProps({ posts, comments }) {
  return {
    posts: posts.posts
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

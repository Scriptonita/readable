import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Glyphicon,
  Button,
  Form,
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";
import PropTypes from "prop-types";
import { getComments, commentVoteUp, commentVoteDown } from "../actions";
import "../css/CommentEdit.css";

const URL = process.env.REACT_APP_API_SERVER;
const HEADER = process.env.REACT_APP_API_HEADER;

/**
* @function CommentEdit
* @Description - Show a list of comments
* @props {array} comments - comments data
*/

class Comments extends Component {
  state = {
    comment: {},
    loaded: false,
    value: ""
  };

  componentWillMount = () => {
    const comment = this.props.comments.filter(
      c => c.id === this.props.match.params.id
    );
    this.setState({
      comment: comment[0]
    });
  };

  getValidateName = () => {
    const length = this.state.comment.author.length;
    if (length === 0) return "error";
  };

  getValidateBody = () => {
    const length = this.state.comment.body.length;
    if (length === 0) return "error";
  };

  handleName = e => {
    this.setState({
      comment: {
        ...this.state.comment,
        author: e.target.value
      }
    });
  };

  handleBody = e => {
    this.setState({
      comment: {
        ...this.state.comment,
        body: e.target.value
      }
    });
  };

  saveComment = () => {
    fetch(URL + "/comments/" + this.state.comment.id, {
      headers: {
        Authorization: HEADER,
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "PUT",
      body: JSON.stringify({
        timestamp: new Date(),
        body: this.state.comment.body
      })
    }).then(result => console.log("Comment edited: " + this.state.comment.id));
  };

  deleteComment = () => {
    fetch(URL + "/comments/" + this.state.comment.id, {
      headers: {
        Authorization: HEADER,
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "DELETE"
    }).then(result => console.log("Comment deleted: " + this.state.comment.id));
  };

  render() {
    let { comment } = this.state;
    console.log("POST: ", this.props.post);
    const { post } = this.props;
    return (
      <div className="post">
        {comment && (
          <div>
            <h3>Edit Comment</h3>
            <br />
            <p>Author: {comment.author}</p>
            <Form>
              <FormGroup
                controlId={"body-" + comment.id}
                validationState={this.getValidateBody()}
              >
                <ControlLabel>Comment</ControlLabel>
                <FormControl
                  componentClass="textarea"
                  onChange={this.handleBody}
                  value={comment.body}
                />
              </FormGroup>
              <br />
              {post && (
                <Row style={{ textAlign: "right" }}>
                  <Col xs={4} md={2} mdOffset={6}>
                    <Link
                      to={{ pathname: "/posts/" + post.id }}
                      style={{ color: "white" }}
                    >
                      <Button bsStyle="primary">
                        <Glyphicon glyph="chevron-left" /> Back
                      </Button>
                    </Link>
                  </Col>
                  <Col xs={4} md={2}>
                    <Link
                      to={{ pathname: "/posts/" + post.id }}
                      style={{ color: "white" }}
                      onClick={this.saveComment}
                    >
                      <Button bsStyle="success">
                        <Glyphicon glyph="ok-sign" /> Save
                      </Button>
                    </Link>
                  </Col>
                  <Col xs={4} md={2}>
                    <Link
                      to={{ pathname: "/posts/" + post.id }}
                      style={{ color: "white" }}
                      onClick={this.deleteComment}
                    >
                      <Button bsStyle="danger">
                        <Glyphicon glyph="remove-sign" /> Delete
                      </Button>
                    </Link>
                  </Col>
                </Row>
              )}
            </Form>
          </div>
        )}
        {!comment && (
          <p>You have to access to edit comments throught a link in comment.</p>
        )}
      </div>
    );
  }
}

function mapStateToProps({ comments, posts }) {
  return {
    comments: comments,
    post: posts.posts[0]
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getComments: comments => dispatch(getComments(comments)),
    voteUp: () => dispatch(commentVoteUp()),
    voteDown: () => dispatch(commentVoteDown())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments);

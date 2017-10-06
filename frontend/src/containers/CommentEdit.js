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
  ControlLabel,
  Alert
} from "react-bootstrap";
import { commentEdited, commentDeleted } from "../actions";
import "../css/CommentEdit.css";

const URL = process.env.REACT_APP_API_SERVER;
const HEADER = process.env.REACT_APP_API_HEADER;

/**
* @function CommentEdit
* @Description - Show a list of comments
* @props {array} posts - parent post data
* @props {array} comments - comments data
* @props {function} commentEdited - dispatch commentEdited() action,
* @props {function} commentDeleted - dispatch(commentDeleted() action,
* @param {boolean} alertVisible: to show alert message
* @param {boolean} successVisible: to show success message
* @param {boolean} authorMod: avoid an error status on author without content on mounting
* @param {boobean} bodyMod: avoid an error status on body without content on mounting
* @param {object} comment: author and body contain the comment data
* @method getValidateName: controller for Author
* @method getValidateBody: controller for body
* @method handleName: set state.comment.author with input
* @method handleBody: set state.comment.body with input
* @method saveComment: send comment data to server
* @method handleDismiss: hide the error message
* @method handleSuccess: hide the success message
*/

class CommentEdit extends Component {
  state = {
    comment: {},
    alertVisible: false,
    successVisible: false
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
    const { comment } = this.state;
    if (comment.body !== "") {
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
      }).then(result => {
        this.setState({
          successVisible: true
        });
        this.props.commentEdited();
      });
    } else {
      this.setState({
        alertVisible: true
      });
    }
  };

  handleDismiss = () => {
    this.setState({
      alertVisible: false
    });
  };

  handleSuccess = () => {
    this.setState({
      successVisible: false
    });
  };

  deleteComment = () => {
    fetch(URL + "/comments/" + this.state.comment.id, {
      headers: {
        Authorization: HEADER,
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "DELETE"
    }).then(result => this.props.commentDeleted());
  };

  render() {
    let { comment, alertVisible, successVisible } = this.state;
    console.log("POST: ", this.props.post);
    const { post } = this.props;
    return (
      <div className="post">
        {alertVisible && (
          <Alert bsStyle="danger" onDismiss={this.handleDismiss}>
            <p>The comment is invalid</p>
          </Alert>
        )}
        {successVisible && (
          <Alert bsStyle="success" onDismiss={this.handleSuccess}>
            <p>
              The comment was saved. Click "Back" if you want to back to the
              post.
            </p>
          </Alert>
        )}
        {comment && (
          <div>
            <h3>Edit Comment</h3>
            <br />
            <p>
              <b>Author: {comment.author}</b>
            </p>
            <br />
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
                    <Button bsStyle="success" onClick={this.saveComment}>
                      <Glyphicon glyph="ok-sign" /> Save
                    </Button>
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
          <Alert bsStyle="danger">
            You have to access to edit comments throught a link in comment.
          </Alert>
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
    commentEdited: () => dispatch(commentEdited()),
    commentDeleted: () => dispatch(commentDeleted())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentEdit);

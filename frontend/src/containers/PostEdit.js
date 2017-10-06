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
import { editPost, deletePost } from "../actions";
import "../css/CommentEdit.css";

const URL = process.env.REACT_APP_API_SERVER;
const HEADER = process.env.REACT_APP_API_HEADER;

/**
* @function CommentEdit
* @Description - Show a list of comments
* @props {function} deletePost - dispatch deletePost action
* @props {function} editPost - dispatch editPost action
* @param {object} post - post data to edit
* @param {boolean} alertVisible: to show alert message
* @param {boolean} successVisible: to show success message
* @method getValidateTitle: controller for title
* @method getValidateBody: controller for body
* @method handleTitle: set state.comment.title with input
* @method handleBody: set state.comment.body with input
* @method savePost: send post data to server
* @method deletePost: send delete flag in post to server
* @method handleDismiss: hide the error message
* @method handleSuccess: hide the success message
*/

class PostEdit extends Component {
  state = {
    post: {},
    successVisible: false,
    alertVisible: false
  };

  componentWillMount = () => {
    this.setState({
      post: this.props.post
    });
  };

  getValidateTitle = () => {
    const length = this.state.post.title.length;
    if (length === 0) return "error";
  };

  getValidateBody = () => {
    const length = this.state.post.body.length;
    if (length === 0) return "error";
  };

  handleTitle = e => {
    this.setState({
      post: {
        ...this.state.post,
        title: e.target.value
      }
    });
  };

  handleBody = e => {
    this.setState({
      post: {
        ...this.state.post,
        body: e.target.value
      }
    });
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

  savePost = () => {
    const { post } = this.state;
    if (post.title !== "" && post.body !== "") {
      fetch(URL + "/posts/" + this.props.match.params.id, {
        headers: {
          Authorization: HEADER,
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "PUT",
        body: JSON.stringify({
          title: this.state.post.title,
          body: this.state.post.body
        })
      }).then(result => {
        this.setState({
          successVisible: true
        });
        this.props.editPost();
      });
    } else {
      this.setState({
        alertVisible: true
      });
    }
  };

  deletePost = () => {
    fetch(URL + "/posts/" + this.props.match.params.id, {
      headers: {
        Authorization: HEADER,
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "DELETE"
    }).then(result => {
      this.props.deletePost();
    });
  };

  render() {
    console.log("POST: ", this.props.post);
    const { post, alertVisible, successVisible } = this.state;
    return (
      <div className="post">
        {post && (
          <div>
            {alertVisible && (
              <Alert bsStyle="danger" onDismiss={this.handleDismiss}>
                <p>There is at least one field invalid</p>
              </Alert>
            )}
            {successVisible && (
              <Alert bsStyle="success" onDismiss={this.handleSuccess}>
                <p>
                  The post was saved. Click "Back" if you want to back to post.
                  post.
                </p>
              </Alert>
            )}
            <h3>Edit Post</h3>
            <br />
            <p>
              <b>Author: {post.author}</b>
            </p>
            <br />
            <Form>
              <FormGroup
                controlId={"title-" + post.title}
                validationState={this.getValidateTitle()}
              >
                <ControlLabel>Title</ControlLabel>
                <FormControl
                  type="text"
                  onChange={this.handleTitle}
                  value={post.title}
                />
              </FormGroup>
              <FormGroup
                controlId={"body-" + post.id}
                validationState={this.getValidateBody()}
              >
                <ControlLabel>Post</ControlLabel>
                <FormControl
                  componentClass="textarea"
                  onChange={this.handleBody}
                  value={post.body}
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
                    <Button bsStyle="success" onClick={this.savePost}>
                      <Glyphicon glyph="ok-sign" /> Save
                    </Button>
                  </Col>
                  <Col xs={4} md={2}>
                    <Link
                      to={{ pathname: "/" }}
                      style={{ color: "white" }}
                      onClick={this.deletePost}
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
        {!post && (
          <Alert bsStyle="danger">
            You have to access to edit posts through a link in post.
          </Alert>
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
    deletePost: () => dispatch(deletePost()),
    editPost: () => dispatch(editPost())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostEdit);

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
import { commentSaved, getComments } from "../actions";
import "../css/CommentEdit.css";
import PropTypes from "prop-types";
const URL = process.env.REACT_APP_API_SERVER;
const HEADER = process.env.REACT_APP_API_HEADER;

/**
* @function AddComments
* @Description - Show a list of comments
* @props {array} comments - comments data
* @props {function} commentSaved: dispatch commentSaved action,
* @props {function} getComments: dispatch getComments action
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

class AddComments extends Component {
  state = {
    comment: {
      body: "",
      author: ""
    },
    alertVisible: false,
    successVisible: false,
    authorMod: false,
    bodyMod: false
  };

  getValidateName = () => {
    const length = this.state.comment.author.length;
    if (length === 0 && this.state.authoMod) return "error";
  };

  getValidateBody = () => {
    const length = this.state.comment.body.length;
    if (length === 0 && this.state.bodyMod) return "error";
  };

  handleName = e => {
    this.setState({
      authorMod: true,
      comment: {
        ...this.state.comment,
        author: e.target.value
      }
    });
  };

  handleBody = e => {
    this.setState({
      bodyMod: true,
      comment: {
        ...this.state.comment,
        body: e.target.value
      }
    });
  };

  saveComment = () => {
    const { comment } = this.state;
    if (comment.author !== "" && comment.body !== "") {
      fetch(URL + "/comments/", {
        headers: {
          Authorization: HEADER,
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
          id: Math.random()
            .toString(21)
            .substr(2, 10),
          parentId: this.props.id,
          timestamp: Date.now(),
          body: comment.body,
          author: comment.author
        })
      }).then(result => {
        this.props.commentSaved();
        this.props.added();
        this.setState({
          comment: {
            body: "",
            author: ""
          },
          successVisible: true,
          authorMod: false,
          bodyMod: false
        });
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

  render() {
    let { comment, alertVisible, successVisible } = this.state;
    return (
      <div className="post">
        {alertVisible && (
          <Alert bsStyle="danger" onDismiss={this.handleDismiss}>
            <p>There is at least one invalid field</p>
          </Alert>
        )}
        {successVisible && (
          <Alert bsStyle="success" onDismiss={this.handleSuccess}>
            <p>Your comment was added. Thanks!!</p>
          </Alert>
        )}
        <div>
          <p>
            <b>New comment:</b>
          </p>
          <Form>
            <FormGroup
              controlId={"author-" + comment.author}
              validationState={this.getValidateName()}
            >
              <ControlLabel>Author</ControlLabel>
              <FormControl
                type="text"
                onChange={this.handleName}
                placeholder="Your name"
                value={comment.author}
              />
            </FormGroup>
            <FormGroup
              controlId={"body-" + comment.body}
              validationState={this.getValidateBody()}
            >
              <ControlLabel>Comment</ControlLabel>
              <FormControl
                componentClass="textarea"
                onChange={this.handleBody}
                placeholder="A comment"
                value={comment.body}
              />
            </FormGroup>
            <br />
            <Row style={{ textAlign: "right" }}>
              <Col xs={12} md={12}>
                <Link
                  to={{ pathname: "/posts/" + this.props.id }}
                  style={{ color: "white" }}
                  onClick={this.saveComment}
                >
                  <Button bsStyle="success">
                    <Glyphicon glyph="ok-sign" /> Save
                  </Button>
                </Link>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    );
  }
}

AddComments.propTypes = {
  id: PropTypes.string.isRequired
};

function mapStateToProps({ comments }) {
  return {
    comments: comments
  };
}

function mapDispatchToProps(dispatch) {
  return {
    commentSaved: () => dispatch(commentSaved()),
    getComments: () => dispatch(getComments())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddComments);

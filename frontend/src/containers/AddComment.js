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
* @function CommentEdit
* @Description - Show a list of comments
* @props {array} comments - comments data
*/

class AddComments extends Component {
  state = {
    comment: {
      body: "Think before you write",
      author: "Your name"
    },
    alertVisible: false
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
          timestamp: new Date(),
          body: comment.body,
          author: comment.author
        })
      }).then(result => {
        this.props.commentSaved();
        this.props.added();
        this.setState({
          comment: {
            body: "Another comment",
            author: "Your name"
          }
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

  render() {
    let { comment, alertVisible } = this.state;
    return (
      <div className="post">
        {alertVisible && (
          <Alert bsStyle="danger" onDismiss={this.handleDismiss}>
            <p>There is at least one invalid field</p>
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

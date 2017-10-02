import React, { Component } from "react";
import { connect } from "react-redux";
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

const URL = process.env.REACT_APP_API_SERVER;
const HEADER = process.env.REACT_APP_API_HEADER;

/**
* @function CommentEdit
* @Description - Show a list of comments
* @props {array} comments - comments data
*/

class NewPost extends Component {
  state = {
    post: {
      author: "",
      category: "react",
      body: "",
      title: ""
    },
    alertVisible: false,
    successVisible: false,
    authorMod: false,
    bodyMod: false,
    titleMod: false
  };

  getValidateName = () => {
    const length = this.state.post.author.length;
    if (length === 0 && this.state.authorMod) return "error";
  };

  getValidateBody = () => {
    const length = this.state.post.body.length;
    if (length === 0 && this.state.bodyMod) return "error";
  };

  getValidateTitle = () => {
    const length = this.state.post.title.length;
    if (length === 0 && this.state.titleMod) return "error";
  };

  handleName = e => {
    this.setState({
      authorMod: true,
      post: {
        ...this.state.post,
        author: e.target.value
      },
      alertVisible: false
    });
  };

  handleBody = e => {
    this.setState({
      bodyMod: true,
      post: {
        ...this.state.post,
        body: e.target.value
      }
    });
  };

  handleCategory = e => {
    this.setState({
      post: {
        ...this.state.post,
        category: e.target.value
      }
    });
  };

  handleTitle = e => {
    this.setState({
      titleMod: true,
      post: {
        ...this.state.post,
        title: e.target.value
      }
    });
  };

  handleSuccess = () => {
    this.setState({
      successVisible: false
    });
  };

  savePost = () => {
    const { post } = this.state;
    if (post.author !== "" && post.body !== "" && post.title !== "") {
      fetch(URL + "/posts/", {
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
          timestamp: new Date(),
          body: post.body,
          author: post.author,
          title: post.title,
          category: post.category
        })
      }).then(result => {
        //this.props.commentSaved();

        this.setState({
          post: {
            author: "",
            category: "react",
            body: "",
            title: ""
          },
          alertVisible: false,
          successVisible: true,
          authorMod: false,
          bodyMod: false,
          titleMod: false
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
    let { post, alertVisible, successVisible } = this.state;
    return (
      <div className="post">
        {alertVisible && (
          <Alert bsStyle="danger" onDismiss={this.handleDismiss}>
            <p>There is at least one invalid field</p>
          </Alert>
        )}
        {successVisible && (
          <Alert bsStyle="success" onDismiss={this.handleSuccess}>
            <p>The post was saved</p>
          </Alert>
        )}
        <div>
          <p>
            <b>New Post:</b>
          </p>
          <Form>
            <FormGroup
              controlId="author-Control"
              validationState={this.getValidateName()}
            >
              <ControlLabel>Author</ControlLabel>
              <FormControl
                type="text"
                onChange={this.handleName}
                value={post.author}
                placeholder="You name"
              />
            </FormGroup>
            <FormGroup controlId="category-Control">
              <ControlLabel>Category</ControlLabel>
              <FormControl
                componentClass="select"
                onChange={this.handleCategory}
                placeholder="select"
              >
                <option value="react">React</option>
                <option value="redux">Redux</option>
                <option value="udacity">Udacity</option>
              </FormControl>
            </FormGroup>
            <FormGroup
              controlId="title-Control"
              validationState={this.getValidateName()}
            >
              <ControlLabel>Title</ControlLabel>
              <FormControl
                type="text"
                onChange={this.handleTitle}
                value={post.title}
                placeholder="A title"
              />
            </FormGroup>
            <FormGroup
              controlId="body-Control"
              validationState={this.getValidateBody()}
            >
              <ControlLabel>Post</ControlLabel>
              <FormControl
                componentClass="textarea"
                onChange={this.handleBody}
                value={post.body}
                placeholder="An amazing history"
              />
            </FormGroup>
            <br />
            <Row style={{ textAlign: "right" }}>
              <Col xs={12} md={12}>
                <Button bsStyle="success" onClick={this.savePost}>
                  <Glyphicon glyph="ok-sign" /> Save
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ posts }) {
  return {
    posts: posts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    commentSaved: () => dispatch(commentSaved()),
    getComments: () => dispatch(getComments())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);

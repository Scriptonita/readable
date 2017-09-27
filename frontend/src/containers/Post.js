import React, { Component } from "react";
import { connect } from "react-redux";
import { getPost, getComments } from "../actions";
import { Panel, Media, Button, Grid, Row, Col } from "react-bootstrap";
import timeConverter from "../utils/Functions";

const URL = process.env.REACT_APP_API_SERVER;

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
      headers: { Authorization: "doki" }
    })
      .then(response => response.json())
      .then(result => {
        this.props.getPost(result);
      });
    fetch(URL + "/posts/" + this.props.match.params.id + "/comments", {
      headers: { Authorization: "doki" }
    })
      .then(response => response.json())
      .then(result => {
        this.props.getComments(result);
      });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.post !== this.props.post) {
      this.setState({
        post: nextProps.post
      });
    }
    if (nextProps.comments !== this.props.comments) {
      this.setState({
        comments: nextProps.comments
      });
    }
  }

  render() {
    const { post, comments } = this.state;
    console.log("COmments: ", comments);
    return (
      <div>
        {post && (
          <Grid>
            <Row>
              <Col xs={10} xsOffset={1} md={8} mdOffset={2}>
                <Panel>
                  <h2>{post.title}</h2>
                  <p style={{ fontSize: "0.9em", textAlign: "right" }}>
                    By {post.author} at {timeConverter(post.timestamp)}
                  </p>
                  <p>{post.body}</p>
                </Panel>
              </Col>
            </Row>
            <Row>
              <Col xs={10} xsOffset={1} md={8} mdOffset={2}>
                <Media.List>
                  {comments &&
                    comments.map(comment => {
                      return (
                        <Media.ListItem>
                          <Media>
                            <Media.Body>
                              <Media.Heading>{comment.author}: </Media.Heading>
                              <Media.Body>
                                <p>{comment.body}</p>
                              </Media.Body>
                            </Media.Body>
                          </Media>
                        </Media.ListItem>
                      );
                    })}
                </Media.List>
              </Col>
            </Row>
          </Grid>
        )}
      </div>
    );
  }
}

function mapStateToProps({ post }) {
  return {
    post: post.post,
    comments: post.comments
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getPost: post => dispatch(getPost(post)),
    getComments: comments => dispatch(getComments(comments))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);

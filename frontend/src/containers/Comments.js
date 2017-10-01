import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Media,
  Panel,
  Row,
  Col,
  Glyphicon,
  Modal,
  Button
} from "react-bootstrap";
import PropTypes from "prop-types";
import timeConverter from "../utils/Functions";
import Votes from "../components/Votes.js";
import { getComments, commentVoteUp, commentVoteDown } from "../actions";
import sortPosts from "../utils/Sort.js";

const URL = process.env.REACT_APP_API_SERVER;
const HEADER = process.env.REACT_APP_API_HEADER;

/**
* @function Comments
* @Description - Show a list of comments
* @props {array} comments - comments data
*/

class Comments extends Component {
  componentDidMount = () => {
    this.getCommentsPost();
  };

  getCommentsPost = () => {
    fetch(URL + "/posts/" + this.props.id + "/comments", {
      headers: { Authorization: HEADER }
    })
      .then(response => response.json())
      .then(result => {
        this.props.getComments(result);
      });
  };

  vote = (id, option) => {
    return fetch(URL + "/comments/" + id, {
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

  voteCommentUp = id => {
    this.vote(id, "upVote")
      .then(res => {
        this.props.voteUp();
        this.getCommentsPost();
      })
      .catch(error => console.log("Error al votar: ", error));
  };

  voteCommentDown = id => {
    this.vote(id, "downVote")
      .then(res => {
        this.props.voteDown();
        this.getCommentsPost();
      })
      .catch(error => console.log("Error al votar: ", error));
  };

  render() {
    let { comments } = this.props;
    comments = sortPosts(comments, "voteScore");
    return (
      <Media.List>
        <p>({comments && comments.length}) Comments</p>

        {comments.map(
          comment =>
            !comment.deleted && (
              <Panel key={comment.id}>
                <Media.ListItem>
                  <Media>
                    <Row>
                      <Col xs={5} md={3}>
                        <Media.Left>
                          <Votes
                            id={comment.id}
                            votes={comment.voteScore}
                            voteUp={this.voteCommentUp}
                            voteDown={this.voteCommentDown}
                          />
                        </Media.Left>
                      </Col>
                      <Col xs={7} md={9}>
                        <Media.Body>
                          <Media.Heading>{comment.author}: </Media.Heading>
                          <Media.Body>
                            <p>{comment.body}</p>
                          </Media.Body>
                        </Media.Body>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={6} md={8}>
                        <Link to={{ pathname: "/comments/edit/" + comment.id }}>
                          <Glyphicon glyph="option-vertical" />
                        </Link>
                      </Col>
                      <Col xs={6} md={4} style={{ textAlign: "right" }}>
                        {timeConverter(comment.timestamp)}
                      </Col>
                    </Row>
                  </Media>
                </Media.ListItem>
              </Panel>
            )
        )}
      </Media.List>
    );
  }
}

Comments.propTypes = {
  id: PropTypes.string.isRequired
};

function mapStateToProps({ comments }) {
  return {
    comments: comments
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

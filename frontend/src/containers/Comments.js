import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Media, Panel, Row, Col, Glyphicon } from "react-bootstrap";
import PropTypes from "prop-types";
import timeConverter from "../utils/Functions";
import Votes from "../components/Votes.js";
import { getComments, commentVoteUp, commentVoteDown } from "../actions";
import sortPosts from "../utils/Sort.js";

const URL = process.env.REACT_APP_API_SERVER;
const HEADER = process.env.REACT_APP_API_HEADER;

const styles = {
  sortedTimestamp: {
    color: "orange",
    textAlign: "center"
  },
  notSortedTimestamp: {
    textAlign: "center"
  }
};

/**
* @function Comments
* @Description - Show a list of comments
* @props {array} comments - comments data
* @props {string} sorted -  sort controller
* @props {function} getComments - dispatch getComments action
* @props {function} voteUp - dispatch commentVoteUp action
* @props {function} voteDown - dispatch commentVoteDown action
* @method vote - send the vote to server
* @method voteCommentUp - functionallity for up
* @methof voteCommenDown - functionallity for down
*/

class Comments extends Component {
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
        this.props.voted();
      })
      .catch(error => console.log("Error al votar: ", error));
  };

  voteCommentDown = id => {
    this.vote(id, "downVote")
      .then(res => {
        this.props.voteDown();
        this.props.voted();
      })
      .catch(error => console.log("Error al votar: ", error));
  };

  render() {
    let { comments, sorted } = this.props;
    comments = sortPosts(comments, sorted);
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
                            sorted={sorted}
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
                          <Glyphicon glyph="pencil" />
                        </Link>
                      </Col>
                      <Col
                        xs={6}
                        md={4}
                        style={
                          sorted === "timestamp"
                            ? styles.sortedTimestamp
                            : styles.notSortedTimestamp
                        }
                      >
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

function mapStateToProps({ comments, posts }) {
  return {
    comments: comments,
    sorted: posts.sorted
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

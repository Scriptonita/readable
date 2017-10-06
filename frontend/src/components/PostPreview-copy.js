import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Grid, Row, Col, Well } from "react-bootstrap";
import PropTypes from "prop-types";
import timeConverter from "../utils/Functions";
import "../css/Post.css";
import { postVoteUp, postVoteDown } from "../actions";
import Votes from "../components/Votes.js";

const URL = process.env.REACT_APP_API_SERVER;
const HEADER = process.env.REACT_APP_API_HEADER;

const styles = {
  voteSort: {
    textAlign: "center",
    color: "orange"
  },
  notVoteSort: {
    textAlign: "center"
  },
  voteTimestamp: {
    color: "orange"
  }
};

/**
* @function PostPreview
* @Description - Show a post preview
* @props {object} post - post data
* @props {string} sorted - Property selected for sort
*/

const PostPreview = ({ post, sorted }) => {
  const vote = (id, option) => {
    return fetch(URL + "/posts/" + id, {
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
  const votePostUp = id => {
    vote(id, "upVote")
      .then(res => {
        voteUp();
        this.props.voted();
      })
      .catch(error => console.log("Error al votar: ", error));
  };

  const votePostDown = id => {
    vote(id, "downVote")
      .then(res => {
        voteDown();
        this.props.voted();
      })
      .catch(error => console.log("Error al votar: ", error));
  };

  return (
    <div className="post" key={post.id}>
      <Grid>
        <Row>
          <Col xs={4} md={3}>
            <Votes
              id={post.id}
              votes={post.voteScore}
              voteUp={votePostUp}
              voteDown={votePostDown}
            />
            {/*  <Well
              style={
                sorted === "voteScore" ? styles.voteSort : styles.notVoteSort
              }
            >
              <h4>{post.voteScore}</h4>
              <h6>Votes</h6>
            </Well>
            */}
          </Col>
          <Col xs={8} md={9}>
            <Link
              to={{ pathname: "/posts/" + post.id }}
              style={{ color: "white" }}
            >
              <h3 style={{ color: "black" }}>{post.title}</h3>
            </Link>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={12}>
            <p style={{ fontSize: "0.9em", textAlign: "right" }}>
              <b>
                <i>By </i>
              </b>
              {post.author}
              <b>
                <i> on </i>
              </b>
              <Link to={{ pathname: "/" + post.category + "/posts" }}>
                {post.category}
              </Link>
              <b>
                <i> at </i>
              </b>
              <span
                style={sorted === "timestamp" ? styles.voteTimestamp : null}
              >
                {timeConverter(post.timestamp)}
              </span>
            </p>
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

PostPreview.propTypes = {
  post: PropTypes.object.isRequired,
  sorted: PropTypes.string.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    voteUp: () => dispatch(postVoteUp()),
    voteDown: () => dispatch(postVoteDown())
  };
}
export default connect(mapDispatchToProps)(PostPreview);

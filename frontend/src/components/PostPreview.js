import React from "react";
import { Link } from "react-router-dom";
import { Grid, Row, Col, Well } from "react-bootstrap";
import PropTypes from "prop-types";
import timeConverter from "../utils/Functions";
import "../css/Post.css";

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
  return (
    <div className="post" key={post.id}>
      <Grid>
        <Row>
          <Col xs={4} md={3}>
            <Well
              style={
                sorted === "voteScore" ? styles.voteSort : styles.notVoteSort
              }
            >
              <h4>{post.voteScore}</h4>
              <h6>Votes</h6>
            </Well>
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

export default PostPreview;

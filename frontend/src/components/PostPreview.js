import React from "react";
import { Link } from "react-router-dom";
import { Button, Jumbotron, Grid, Row, Col, Well } from "react-bootstrap";
import PropTypes from "prop-types";
import timeConverter from "../utils/Functions";

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

const PostPreview = ({ post, sorted }) => {
  return (
    <div className="container">
      <Jumbotron key={post.id}>
        <Grid style={{ width: "100%" }}>
          <Row className="show-grid">
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
              <h3>{post.title}</h3>

              <p style={{ fontSize: "1em" }}>
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
          <br />
          <Row>
            <Col xs={12} md={12}>
              {post.body}
            </Col>
          </Row>
          <br />
          <Row>
            <Col xs={2} xsOffset={8} md={2} mdOffset={10}>
              <Button bsStyle="primary">
                <Link
                  to={{ pathname: "/posts/" + post.id }}
                  style={{ color: "white" }}
                >
                  {" "}
                  Read{" "}
                </Link>
              </Button>
            </Col>
          </Row>
        </Grid>
      </Jumbotron>
    </div>
  );
};

PostPreview.propTypes = {
  post: PropTypes.object.isRequired,
  sorted: PropTypes.string.isRequired
};

export default PostPreview;

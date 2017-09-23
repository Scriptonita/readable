import React from "react";
import { Link } from "react-router-dom";
import { Button, Jumbotron } from "react-bootstrap";
import PropTypes from "prop-types";

const PostPreview = ({ post }) => {
  return (
    <div className="container">
      <Jumbotron key={post.id}>
        <h3>{post.title}</h3>
        <b>author:</b> {post.author}
        <br />
        <br />
        {post.body}
        <br />
        <br />
        <Button bsStyle="primary">
          <Link
            to={{ pathname: "/posts/" + post.id }}
            style={{ color: "white" }}
          >
            {" "}
            Read{" "}
          </Link>
        </Button>
      </Jumbotron>
    </div>
  );
};

PostPreview.propTypes = {
  post: PropTypes.object.isRequired
};

export default PostPreview;

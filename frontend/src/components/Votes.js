import React from "react";
import { Well, Row, Col, Glyphicon } from "react-bootstrap";
import PropTypes from "prop-types";

const styles = {
  voteSort: {
    textAlign: "center",
    color: "orange"
  },
  notVoteSort: {
    textAlign: "center"
  }
};

/**
* @function Comments
* @Description - Show a list of comments
* @props {array} comments - comments data
*/

const Votes = ({ id, votes, voteUp, voteDown, sorted }) => {
  const Up = () => {
    voteUp(id);
  };

  const Down = () => {
    voteDown(id);
  };
  return (
    <Well>
      <Row
        style={sorted === "voteScore" ? styles.voteSort : styles.notVoteSort}
      >
        <h4>{votes}</h4>
        <h6>Votes</h6>
      </Row>
      <Row style={{ textAlign: "center" }}>
        <Col xs={6} md={6}>
          <Glyphicon glyph="arrow-up" onClick={Up} />
        </Col>
        <Col xs={6} md={6}>
          <Glyphicon glyph="arrow-down" onClick={Down} />
        </Col>
      </Row>
    </Well>
  );
};

Votes.propTypes = {
  id: PropTypes.string.isRequired,
  voteUp: PropTypes.func.isRequired,
  voteDown: PropTypes.func.isRequired,
  votes: PropTypes.number.isRequired
  /*sorted: PropTypes.string.isRequired*/
};

export default Votes;

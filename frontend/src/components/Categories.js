import React, { Component } from "react";
import {
  Nav,
  NavItem,
  NavDropdown,
  MenuItem,
  Button,
  Grid,
  Row,
  Col
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import PropTypes from "prop-types";
const styles = {
  container: {
    width: "80%"
  },
  right: {
    textAlign: "right",
    fontSize: "0.8em"
  }
};

/**
* @function Categories
* @Description - Show a Navbar with categories and a sort controller
* @param {function} sortByVotes - Handle to sort by voteScore
* @param {function} sortByTime - Handle to sort by timestamp
* @props {array} categories - List of categories availables
* @props {string} sort - Property selected for sort
*/

class Categories extends Component {
  sortByVotes = () => {
    this.props.sort("voteScore");
  };

  sortByTime = () => {
    this.props.sort("timestamp");
  };

  render() {
    let eventKey = 2; // Controller for index
    const categories = this.props.categories;
    return (
      <div>
        <Nav bsStyle="tabs">
          <NavItem eventKey={0} disabled key="Categories">
            <b>Categories</b>
          </NavItem>
          <LinkContainer to={{ pathname: "/" }} exact>
            <NavItem eventKey={1} key="allCategories">
              All
            </NavItem>
          </LinkContainer>

          {categories &&
            categories.map(category => {
              let index = eventKey++;
              return (
                <LinkContainer
                  to={{ pathname: "/" + category.path }}
                  key={category.name}
                >
                  <NavItem eventKey={index}>{category.name}</NavItem>
                </LinkContainer>
              );
            })}
          <NavDropdown eventKey title="Sort" id="nav-dropdown">
            <MenuItem eventKey="4.1" onClick={this.sortByVotes}>
              Votes
            </MenuItem>
            <MenuItem eventKey="4.2" onClick={this.sortByTime}>
              Time
            </MenuItem>
          </NavDropdown>
        </Nav>
        <br />
        <Grid style={styles.container}>
          <Row>
            <Col xs={2} md={2}>
              <LinkContainer to={{ pathname: "/create" }}>
                <Button>New</Button>
              </LinkContainer>
            </Col>
            <Col xs={3} xsOffset={7} md={3} mdOffset={7}>
              <p style={styles.right}>
                Order by{" "}
                <span style={{ color: "orange" }}>{this.props.sorted}</span>
              </p>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

Categories.propTypes = {
  categories: PropTypes.array.isRequired,
  sorted: PropTypes.string.isRequired
};

export default Categories;

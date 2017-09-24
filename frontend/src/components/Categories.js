import React, { Component } from "react";
import { Link } from "react-router-dom";
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
* @
*/

class Categories extends Component {
  state = {
    index: 1
  };

  handleIndex = key => {
    this.setState({
      index: key
    });
  };

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
        <Nav bsStyle="tabs" activeKey={this.state.index}>
          <NavItem eventKey={0} disabled key="Categories">
            <b>Categories</b>
          </NavItem>
          <NavItem eventKey={1} key="allCategories">
            <Link to={{ pathname: "/" }} onClick={() => this.handleIndex(1)}>
              All
            </Link>
          </NavItem>
          {categories &&
            categories.map(category => {
              let index = eventKey++;
              return (
                <NavItem eventKey={index} key={category.name}>
                  <Link
                    to={{ pathname: "/" + category.path + "/posts" }}
                    onClick={() => this.handleIndex(index)}
                  >
                    {category.name}
                  </Link>
                </NavItem>
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
            <Col xs={2} ms={2}>
              <Button>New</Button>
            </Col>
            <Col xs={3} xsOffset={7} ms={3} msOffset={7}>
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

import React, { Component } from "react";
import { connect } from "react-redux";
import { changeSortBy } from "../actions";
import {
  Nav,
  Navbar,
  NavItem,
  NavDropdown,
  MenuItem,
  Button,
  Grid,
  Row,
  Col
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
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
* @method {function} sortByVotes - Handle to sort by voteScore
* @method {function} sortByTime - Handle to sort by timestamp
* @props {array} categories - List of categories availables
* @props {string} sort - Property selected for sort
* @props {function} changeSortBy - Action to change Sort factor
*/

class Categories extends Component {
  sortByVotes = () => {
    const sorted = {
      sorted: "voteScore"
    };
    this.props.changeSortBy(sorted);
  };

  sortByTime = () => {
    const sorted = {
      sorted: "timestamp"
    };
    this.props.changeSortBy(sorted);
  };

  categoriesList = () => {
    const categories = this.props.categories;
    let eventKey = 0;
    return (
      <Navbar>
        <Nav bsStyle="pills" activeKey={this.props.actual}>
          {categories.map(category => {
            let index = eventKey++;
            return (
              <LinkContainer
                to={{ pathname: "/" + category.path }}
                key={"Link" + category.name}
                exact={true}
              >
                <NavItem key={category.name} eventKey={index}>
                  {category.name}
                </NavItem>
              </LinkContainer>
            );
          })}
          <NavDropdown eventKey="sort" title="Sort" id="nav-dropdown">
            <MenuItem eventKey="sort.1" onClick={this.sortByVotes}>
              Votes
            </MenuItem>
            <MenuItem eventKey="sort.2" onClick={this.sortByTime}>
              Time
            </MenuItem>
          </NavDropdown>
        </Nav>
      </Navbar>
    );
  };

  render() {
    return (
      <div>
        {this.categoriesList()}
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

function mapStateToProps({ categories, posts }) {
  return {
    categories: categories.categories,
    actual: categories.actual,
    sorted: posts.sorted
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeSortBy: data => dispatch(changeSortBy(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);

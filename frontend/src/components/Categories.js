import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Nav, NavItem, NavDropdown, MenuItem } from "react-bootstrap";
import PropTypes from "prop-types";

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
    );
  }
}

Categories.propTypes = {
  categories: PropTypes.array.isRequired
};

export default Categories;

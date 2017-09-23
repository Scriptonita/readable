import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Nav, NavItem } from "react-bootstrap";
import PropTypes from "prop-types";

class Categories extends Component {
  state = {
    index: 1
  };

  handleIndex = key => {
    this.setState({
      index: key
    });
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
      </Nav>
    );
  }
}

Categories.propTypes = {
  categories: PropTypes.array.isRequired
};

export default Categories;

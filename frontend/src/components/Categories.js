import React from "react";
import { Link } from "react-router-dom";
import { Nav, NavItem } from "react-bootstrap";
import PropTypes from "prop-types";

const Categories = ({ categories }) => {
  let eventKey = 1;
  return (
    <Nav bsStyle="tabs" activeKey={1}>
      <NavItem eventKey={0} disabled key="Categories">
        <b>Categories</b>
      </NavItem>
      <NavItem eventKey={1} key="allCategories">
        <Link to={{ pathname: "/" }}>All</Link>
      </NavItem>
      {categories &&
        categories.map(category => {
          return (
            <NavItem eventKey={++eventKey} key={category.name}>
              <Link to={{ pathname: "/" + category.path + "/posts" }}>
                {category.name}
              </Link>
            </NavItem>
          );
        })}
    </Nav>
  );
};

Categories.propTypes = {
  categories: PropTypes.array.isRequired
};

export default Categories;

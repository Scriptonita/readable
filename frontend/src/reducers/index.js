import { combineReducers } from "redux";

import {
  GET_ALL_POSTS,
  GET_POSTS_FROM_CATEGORY,
  CHANGE_SORT_BY,
  SELECT_CATEGORY,
  GET_ALL_CATEGORIES,
  ACTUAL_CATEGORY
} from "../actions";

function posts(store = { posts: [], sorted: "voteScore" }, action) {
  const { posts, sorted } = action;
  switch (action.type) {
    case GET_ALL_POSTS:
      return {
        ...store,
        posts: posts
      };
    case GET_POSTS_FROM_CATEGORY:
      return {
        ...store,
        posts: posts
      };
    case CHANGE_SORT_BY:
      return {
        ...store,
        sorted: sorted
      };
    default:
      return store;
  }
}

function categories(
  store = { categories: [{ name: "All", path: "" }], actual: "All" },
  action
) {
  switch (action.type) {
    case GET_ALL_CATEGORIES:
      const { categories } = action;
      return {
        ...store,
        categories: store.categories.concat(categories)
      };
    case SELECT_CATEGORY:
      return {
        ...store,
        category: action.category
      };
    case ACTUAL_CATEGORY:
      return {
        ...store,
        actual: action.actual
      };
    default:
      return store;
  }
}

export default combineReducers({
  posts,
  categories
});

import { combineReducers } from "redux";

import {
  GET_ALL_POSTS,
  GET_POSTS_FROM_CATEGORY,
  CHANGE_SORT_BY,
  SELECT_CATEGORY,
  GET_ALL_CATEGORIES
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

function categories(store = { categories: [] }, action) {
  switch (action.type) {
    case GET_ALL_CATEGORIES:
      const { categories } = action;
      return {
        ...store,
        categories: categories
      };
    case SELECT_CATEGORY:
      return {
        ...store,
        category: action.category
      };
    default:
      return store;
  }
}

export default combineReducers({
  posts,
  categories
});

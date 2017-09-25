import { combineReducers } from "redux";

import {
  GET_ALL_POSTS,
  GET_POSTS_FROM_CATEGORY,
  CHANGE_SORT_BY
} from "../actions";

const URL = process.env.REACT_APP_API_SERVER;

function posts(store = { posts: [] }, action) {
  switch (action.type) {
    case GET_ALL_POSTS:
      const { posts } = action;
      return {
        ...store,
        posts: posts
      };
      break;
    default:
      return store;
  }
}

function sortBy(store = { sorted: "voteScore" }, action) {
  switch (action.type) {
    case CHANGE_SORT_BY:
      const { sorted } = action;
      return {
        ...store,
        sorted: sorted
      };
      break;
    default:
      return store;
  }
}

export default combineReducers({
  posts,
  sortBy
});

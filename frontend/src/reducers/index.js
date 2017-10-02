import { combineReducers } from "redux";

import {
  GET_ALL_POSTS,
  ADD_NEW_POST,
  GET_POSTS_FROM_CATEGORY,
  CHANGE_SORT_BY,
  SELECT_CATEGORY,
  GET_ALL_CATEGORIES,
  ACTUAL_CATEGORY,
  GET_A_POST,
  GET_COMMENTS_FOR_A_POST,
  POST_VOTE_UP,
  POST_VOTE_DOWN,
  COMMENT_VOTE_UP,
  COMMENT_VOTE_DOWN,
  COMMENT_EDITED,
  COMMENT_DELETED,
  COMMENT_SAVED
} from "../actions";

function posts(store = { posts: [], sorted: "voteScore" }, action) {
  const { posts, sorted, post } = action;
  switch (action.type) {
    case GET_ALL_POSTS:
      store.posts = [];
      return {
        ...store,
        posts: posts
      };
    case ADD_NEW_POST:
      return store;
    case GET_POSTS_FROM_CATEGORY:
      store.posts = [];
      return {
        ...store,
        posts: posts
      };
    case GET_A_POST:
      store.posts = [];
      return {
        ...store,
        posts: store.posts.concat(post)
      };
    case POST_VOTE_UP:
      return {
        ...store
      };
    case POST_VOTE_DOWN:
      return {
        ...store
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

function comments(store = [], action) {
  switch (action.type) {
    case GET_COMMENTS_FOR_A_POST:
      store = [];
      return [...action.comments];

    case COMMENT_VOTE_UP:
      return store;

    case COMMENT_VOTE_DOWN:
      return store;

    case COMMENT_EDITED:
      return store;

    case COMMENT_DELETED:
      return store;

    case COMMENT_SAVED:
      return store;

    default:
      return store;
  }
}

export default combineReducers({
  posts,
  categories,
  comments
});

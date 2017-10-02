export const GET_ALL_POSTS = "GET_ALL_POSTS";
export const GET_POSTS_FROM_CATEGORY = "GET_POSTS_FROM_CATEGORY";
export const CHANGE_SORT_BY = "CHANGE_SORT_BY";
export const SELECT_CATEGORY = "SELECT_CATEGORY";
export const GET_ALL_CATEGORIES = "GET_ALL_CATEGORIES";
export const ACTUAL_CATEGORY = "ACTUAL_CATEGORY";
export const GET_A_POST = "GET_A_POST";
export const GET_COMMENTS_FOR_A_POST = "GET_COMMENTS_FOR_A_POST";
export const POST_VOTE_UP = "POST_VOTE_UP";
export const POST_VOTE_DOWN = "POST_VOTE_DOWN";
export const COMMENT_VOTE_UP = "COMMENT_VOTE_UP";
export const COMMENT_VOTE_DOWN = "COMMENT_VOTE_DOWN";
export const COMMENT_EDITED = "COMMENT_EDITED";
export const COMMENT_DELETED = "COMMENT_DELETED";
export const COMMENT_SAVED = "COMMENT_SAVED";

export function getAll(posts) {
  return {
    type: GET_ALL_POSTS,
    posts
  };
}

export function getPostFromCategory(posts) {
  return {
    type: GET_POSTS_FROM_CATEGORY,
    posts
  };
}

export function getPost(post) {
  return {
    type: GET_A_POST,
    post
  };
}

export function changeSortBy({ sorted }) {
  return {
    type: CHANGE_SORT_BY,
    sorted
  };
}

export function getAllCategories({ categories }) {
  return {
    type: GET_ALL_CATEGORIES,
    categories
  };
}

export function selectCategory({ category }) {
  return {
    type: SELECT_CATEGORY,
    category
  };
}

export function actualCategory(actual) {
  return {
    type: ACTUAL_CATEGORY,
    actual
  };
}

export function getComments(comments) {
  return {
    type: GET_COMMENTS_FOR_A_POST,
    comments
  };
}

export function postVoteUp() {
  return {
    type: POST_VOTE_UP
  };
}

export function postVoteDown() {
  return {
    type: POST_VOTE_DOWN
  };
}

export function commentVoteUp() {
  return {
    type: COMMENT_VOTE_UP
  };
}

export function commentVoteDown() {
  return {
    type: COMMENT_VOTE_DOWN
  };
}

export function commentEdited() {
  return {
    type: COMMENT_EDITED
  };
}

export function commentDeleted() {
  return {
    type: COMMENT_DELETED
  };
}

export function commentSaved() {
  return {
    type: COMMENT_SAVED
  };
}

export const GET_ALL_POSTS = "GET_ALL_POSTS";
export const GET_POSTS_FROM_CATEGORY = "GET_POSTS_FROM_CATEGORY";
export const CHANGE_SORT_BY = "CHANGE_SORT_BY";
export const SELECT_CATEGORY = "SELECT_CATEGORY";
export const GET_ALL_CATEGORIES = "GET_ALL_CATEGORIES";
export const ACTUAL_CATEGORY = "ACTUAL_CATEGORY";
export const GET_A_POST = "GET_A_POST";
export const GET_COMMENTS_FOR_A_POST = "GET_COMMENTS_FOR_A_POST";

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

export function getPost(post) {
  return {
    type: GET_A_POST,
    post
  };
}

export function getComments(comments) {
  return {
    type: GET_COMMENTS_FOR_A_POST,
    comments
  };
}

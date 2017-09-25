export const GET_ALL_POSTS = "GET_ALL_POSTS";
export const GET_POSTS_FROM_CATEGORY = "GET_POSTS_FROM_CATEGORY";
export const CHANGE_SORT_BY = "CHANGE_SORT_BY";

export function getAll(posts) {
  return {
    type: GET_ALL_POSTS,
    posts
  };
}

export function getPostFromCategory({ posts, category }) {
  return {
    type: GET_POSTS_FROM_CATEGORY,
    posts,
    category
  };
}

export function changeSortBy({ sortedBy }) {
  type: CHANGE_SORT_BY, sortedBy;
}

function sortPosts(posts, sort) {
  switch (sort) {
    case "voteScore":
      posts.sort(function(a, b) {
        return b.voteScore - a.voteScore;
      });
      break;
    case "timestamp":
      posts.sort(function(a, b) {
        return b.timestamp - a.timestamp;
      });
      break;
    default:
      break;
  }
  return posts;
}

export default sortPosts;

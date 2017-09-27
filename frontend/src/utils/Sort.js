function sortPosts(posts, sort) {
  if (posts.length > 0) {
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
  return null;
}

export default sortPosts;

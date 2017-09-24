function sortPosts(posts, sort) {
  switch (sort) {
    case "voteScore":
      posts.sort(function(a, b) {
        return b.voteScore - a.voteScore;
      });
      console.log("Sort by Votes");
      break;
    case "timestamp":
      posts.sort(function(a, b) {
        return b.timestamp - a.timestamp;
      });
      console.log("Sort by TimeStamp");
      break;
    default:
      break;
  }
  return posts;
}

export default sortPosts;

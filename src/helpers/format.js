exports.formatPosts = (posts, comments) => {
  posts.forEach((post, index) => {
    post.children = comments[index].rows;
  });
  return posts;
};

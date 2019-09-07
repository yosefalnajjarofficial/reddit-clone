const showComments = document.querySelector('.comments-btn');
const userComments = document.querySelector('.user-comments');
const showPosts = document.querySelector('.posts-btn');
const userPosts = document.querySelector('.profile-posts');
const addPost = document.querySelector('.add-post-btn');
const postForm = document.querySelector('.post-form');
const communityForm = document.querySelector('.add-community');
const addCommunity = document.querySelector('.add-community-btn');

showComments.addEventListener('click', () => {
  userComments.classList.toggle('hide');
  userPosts.classList.add('hide');
  postForm.classList.add('hide');
  communityForm.classList.add('hide');
});

showPosts.addEventListener('click', () => {
  userComments.classList.add('hide');
  userPosts.classList.toggle('hide');
  postForm.classList.add('hide');
  communityForm.classList.add('hide');
});

addPost.addEventListener('click', () => {
  userComments.classList.add('hide');
  userPosts.classList.add('hide');
  postForm.classList.toggle('hide');
  communityForm.classList.add('hide');
});

addCommunity.addEventListener('click', () => {
  userComments.classList.add('hide');
  userPosts.classList.add('hide');
  postForm.classList.add('hide');
  communityForm.classList.toggle('hide');
});

/* eslint-disable no-param-reassign */
const joinBtn = document.querySelectorAll('.join');

Array.from(joinBtn).forEach((button) => {
  button.addEventListener('click', () => {
    button.classList.toggle('joined');
    const communityLink = button.previousElementSibling.previousElementSibling;
    const communityName = communityLink.textContent;

    fetch('/join', {
      method: 'POST',
      body: JSON.stringify({ name: communityName }),
      headers: { 'Content-Type': 'application/json' },
    });
  });
});

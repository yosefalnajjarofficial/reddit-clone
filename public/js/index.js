const signupForm = document.querySelector('.singup-form');
const errMessage = document.querySelector('.err-message');
const username = document.querySelector('.username-field');
const password = document.querySelector('.password-field');
const confirmPassword = document.querySelector('.confirm-field');
const email = document.querySelector('.email-field');
const bio = document.querySelector('.bio-field');

signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // Clear when no mistakes are found
  errMessage.textContent = '';

  if (Number(username.value)) {
    errMessage.textContent = 'username cannot be a number';
  }

  if (password.value.length < 8) {
    errMessage.textContent = 'password length should be more than 8 letters';
  }

  if (Number(password.value)) {
    errMessage.textContent = 'password should contain numbers and letters';
  }

  if (confirmPassword.value !== password.value) {
    errMessage.textContent = 'the two passwords should match';
  }

  const formData = {
    username: username.value,
    password: password.value,
    confirmPassword: confirmPassword.value,
    email: email.value,
    bio: bio.value,
  };

  fetch('/signup', {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: { 'Content-Type': 'application/json' },
  });
  //   .then((window.location = '/'));
});

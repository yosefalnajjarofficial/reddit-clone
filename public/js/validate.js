const signupForm = document.querySelector('.singup-form');
const errMessage = document.querySelector('.err-message');
const username = document.querySelector('.username-field');
const password = document.querySelector('.password-field');
const confirmPassword = document.querySelector('.confirm-field');

signupForm.addEventListener('submit', (e) => {
  const errorMessages = [];
  // Clear when no mistakes are found
  errMessage.textContent = '';

  if (Number(username.value)) {
    errorMessages.push('username cannot be a number');
  }

  if (password.value.length < 8) {
    errorMessages.push('password length should be more than 8 letters');
  }

  if (Number(password.value)) {
    errorMessages.push('password should contain numbers and letters');
  }

  if (confirmPassword.value !== password.value) {
    errorMessages.push('the two passwords should match');
  }

  if (errorMessages.length > 0) {
    e.preventDefault();
    errMessage.textContent = errorMessages.join(',');
  }
});

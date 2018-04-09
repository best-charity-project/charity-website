export default (password, confirmPassword) => {
  if (password.value !== confirmPassword.value) {
    confirmPassword.setCustomValidity('Пароль не соответствует');
  } else {
    confirmPassword.setCustomValidity('');
  }
};

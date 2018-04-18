export default (password, confirmPassword) => {
  if (password !== confirmPassword.value) {
    confirmPassword.setCustomValidity('Пароль не соответствует');
  } else {
    confirmPassword.setCustomValidity('');
  }
};

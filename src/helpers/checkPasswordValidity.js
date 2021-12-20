function checkPasswordValidity(password) {
  const passwordRegexp =
    /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  return passwordRegexp.test(password);
}

export default checkPasswordValidity;

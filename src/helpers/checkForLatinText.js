function checkForLatinText(text) {
  const onlyLatinRegexp = /^[A-Za-z0-9\s-!@#$%^&*()_+=-`~\\\][{}|';:/.,?><]*$/;

  return onlyLatinRegexp.test(text);
}

export default checkForLatinText;

function checkForOnlyNumbers(text) {
  const onlyNumbersRegexp = /^\d*$/;

  return onlyNumbersRegexp.test(text);
}

export default checkForOnlyNumbers;

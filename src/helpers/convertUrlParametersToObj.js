export const convertUrlParametersToObj = (url) => {
  return JSON.parse(
    '{"' +
      decodeURI(url.split('?')[1])
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  );
};

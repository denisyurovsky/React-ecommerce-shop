const checkAccessTokenExpiration = (time) => {
  const now = new Date();

  return Date.parse(now) / 1000 > time;
};

export default checkAccessTokenExpiration;

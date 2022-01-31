import jwtDecode from 'jwt-decode';

const getDecodedAccessToken = () =>
  localStorage.accessToken ? jwtDecode(localStorage.accessToken) : null;

export default getDecodedAccessToken;

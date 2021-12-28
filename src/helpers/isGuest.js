export const isGuest = (userId) => {
  if (userId === null) {
    return true;
  } else {
    return false;
  }
};

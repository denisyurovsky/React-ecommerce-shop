export const getCartFromStorage = () => {
  return JSON.parse(localStorage.getItem('cart'));
};

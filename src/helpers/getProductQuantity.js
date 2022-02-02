const getProductQuantity = (sellers, productId) =>
  Object.keys(sellers)
    .reduce((acc, key) => [...acc, ...sellers[key].products], [])
    .find((product) => product.productId === productId)?.quantity;

export default getProductQuantity;

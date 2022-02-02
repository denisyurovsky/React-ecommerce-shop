const getSelectedProductIds = (sellers) =>
  Object.keys(sellers)
    .reduce((acc, key) => [...acc, ...sellers[key].products], [])
    .filter(({ checked }) => checked)
    .reduce((acc, product) => [...acc, product.productId], []);

export default getSelectedProductIds;

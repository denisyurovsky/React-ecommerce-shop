const getCheckedProductsQuantity = (sellers) =>
  Object.keys(sellers)
    .reduce((acc, key) => [...acc, ...sellers[key].products], [])
    .filter(({ checked }) => checked)
    .reduce((acc, checked) => acc + checked.quantity, 0);

export default getCheckedProductsQuantity;

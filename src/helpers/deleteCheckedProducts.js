const deleteCheckedProducts = (sellers) => {
  Object.keys(sellers).forEach((key) => {
    sellers[key].products = sellers[key].products.filter((product) => {
      return !product.checked;
    });
    if (!sellers[key].products.length) {
      delete sellers[key];
    }
  });

  return sellers;
};

export default deleteCheckedProducts;

const getSelectedProductQuantity = (sellers) => {
  const keys = Object.keys(sellers);
  let selectedProducts = 0;

  keys.forEach((key) => {
    const selectedSellerProducts = sellers[key].products.reduce(
      (acc, product) => {
        if (product.checked) {
          return acc + product.quantity;
        }

        return acc;
      },
      0
    );

    selectedProducts += selectedSellerProducts;
  });

  return selectedProducts;
};

export default getSelectedProductQuantity;

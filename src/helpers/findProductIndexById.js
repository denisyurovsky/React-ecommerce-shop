export const findProductIndexById = (products, id) => {
  return products.findIndex((item) => item.productId === id);
};

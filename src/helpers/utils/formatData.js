const formatPrice = (price) => {
  const options = {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: price === Math.round(price) ? 0 : 2,
  };

  return new Intl.NumberFormat('ru-RU', options).format(price);
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('ru-RU');
};

const formatDiscountInPercents = (price, discountPrice) => {
  return `${Math.trunc(((price - discountPrice) * 100) / price)} %`;
};

export { formatDate, formatPrice, formatDiscountInPercents };

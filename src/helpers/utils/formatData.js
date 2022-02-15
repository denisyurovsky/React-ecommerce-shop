const formatPrice = (price) => {
  const options = {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: price === Math.round(price) ? 0 : 2,
  };

  return new Intl.NumberFormat('ru-RU', options).format(price);
};

const formatDate = (date) => new Date(date).toLocaleDateString('ru-RU');

const formatFileSize = (size) => {
  const sizeInKB = size / 1024;
  const options = {
    maximumFractionDigits: 0,
  };

  return `${new Intl.NumberFormat('ru-RU', options).format(sizeInKB)}KB`;
};

const formatDiscountInPercents = (price, discountPrice) => {
  return `${Math.trunc(((price - discountPrice) * 100) / price)} %`;
};

export { formatDate, formatPrice, formatFileSize, formatDiscountInPercents };

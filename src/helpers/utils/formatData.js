const formatPrice = (price) => {
  const options = {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: Number(price) === Math.round(Number(price)) ? 0 : 2,
  };

  return new Intl.NumberFormat('ru-RU', options).format(price);
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('ru-RU');
};

export { formatDate, formatPrice };

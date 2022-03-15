import { format } from 'date-fns';

import { PAYCARD_LENGTHS } from '../constants/constants';

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

const formatDateWithFullMonth = (input) => {
  return format(new Date(input), 'dd MMMM yyyy');
};

const formatDateWithShortMonth = (input) => {
  return format(new Date(input), 'dd MMM yyyy');
};

const leaveDigits = (str, numberOfDigits = PAYCARD_LENGTHS.NUMBER) => {
  return str.replace(/[^0-9]/g, '').slice(0, numberOfDigits);
};

const leaveLetters = (str, numberOfLetters = PAYCARD_LENGTHS.HOLDER_NAME) => {
  return str.replace(/[^A-Z\s]/gi, '').slice(0, numberOfLetters);
};

export {
  formatDate,
  formatFileSize,
  formatPrice,
  formatDateWithFullMonth,
  formatDateWithShortMonth,
  formatDiscountInPercents,
  leaveDigits,
  leaveLetters,
};

import _ from 'lodash';

import { PAYCARD_LENGTHS } from '../../../constants/constants';
import { leaveDigits, leaveLetters } from '../../../helpers/formatData';

import checkExpDate from './checkExpDate';
import { formatExpDate } from './formatCreditCard';

const { NUMBER: CARD_LENGTH, CVV: CVV_LENGTH } = PAYCARD_LENGTHS;

const checkIsLengthNotValid = (val, length) => _.inRange(val.length, 1, length);

const getCardItem = (value, id, isExpDateNotValid) => {
  switch (id) {
    case 'cardNumber':
      return {
        cardNumber: {
          value: leaveDigits(value, CARD_LENGTH),
          error: checkIsLengthNotValid(leaveDigits(value), CARD_LENGTH),
        },
      };
    case 'expDate':
      return {
        expDate: {
          value: formatExpDate(value),
          error: isExpDateNotValid,
        },
      };
    case 'cvv':
      return {
        cvv: {
          value: leaveDigits(value, CVV_LENGTH),
          error: checkIsLengthNotValid(
            leaveDigits(value, CVV_LENGTH),
            CVV_LENGTH
          ),
        },
      };
    case 'cardHolder':
      return {
        cardHolder: {
          value: leaveLetters(value),
        },
      };
  }
};

const handleCardItem = ({ value, id }) => {
  let isExpDateNotValid, message;

  if (id === 'expDate') {
    const { result, text } = checkExpDate(value);

    message = text;
    isExpDateNotValid = result;
  }

  return { cardItem: getCardItem(value, id, isExpDateNotValid), text: message };
};

export default handleCardItem;

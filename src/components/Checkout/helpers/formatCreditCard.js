import { PAYCARD_LENGTHS } from '../../../constants/constants';
import { leaveDigits } from '../../../helpers/formatData';

export const formatCardNumber = (str) => str.replace(/(\d{4})/g, '$1 ').trim();

export const formatExpDate = (str) => {
  const res = leaveDigits(str, PAYCARD_LENGTHS.EXP_DATE);

  if (res.length < 3) return res.slice(0, 2);

  return res.replace(/(\d{2})/, '$1/');
};

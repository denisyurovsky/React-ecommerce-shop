import { PAYCARD_LENGTHS } from '../../../constants/constants';
import { leaveDigits } from '../../../helpers/formatData';
import { EXP_DATE_TEXT } from '../constants/constants';

const { EXP_DATE: EXP_DATE_LENGTH } = PAYCARD_LENGTHS;
const { EXPIRED_ERROR, DEFAULT, MONTH_ERROR } = EXP_DATE_TEXT;

const checkExpDate = (val) => {
  const month = val.slice(0, 2);

  if ((month.length && month[0] > 1) || month > 12 || month == 0) {
    return { result: true, text: MONTH_ERROR };
  }

  if (leaveDigits(val, EXP_DATE_LENGTH).length === EXP_DATE_LENGTH) {
    const year = val.slice(3, 5);

    if (new Date(`20${year}`, month) - Date.now() < 0) {
      return { result: true, text: EXPIRED_ERROR };
    }

    return { result: false, text: DEFAULT };
  }

  return { result: val.length > 0, text: DEFAULT };
};

export default checkExpDate;

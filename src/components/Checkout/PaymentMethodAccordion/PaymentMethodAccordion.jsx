import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PaymentsRoundedIcon from '@mui/icons-material/PaymentsRounded';
import {
  Accordion,
  AccordionDetails,
  Box,
  Typography,
  Button,
} from '@mui/material';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useState, useEffect, useCallback, useContext } from 'react';
import { Maestro, Mastercard, Visa, VisaElectron } from 'react-pay-icons';
import { toast } from 'react-toastify';

import paymentApi, { sendPayment } from '../../../api/payment';
import { ERROR } from '../../../constants/constants';
import { CheckoutContext } from '../../../pages/CheckoutPage/CheckoutPage';
import Spinner from '../../ui-kit/Spinner/Spinner';
import { StandardTextField } from '../../ui-kit/StandardTextField/StandardTextField';
import {
  EMPTY_PAYMENT_CARD,
  EXP_DATE_TEXT,
  PANEL,
} from '../constants/constants';
import AccordionSummary from '../helpers/AccordionSummary';
import { formatCardNumber } from '../helpers/formatCreditCard';
import handleCardItem from '../helpers/handleCardItem';

import styles from './PaymentMethodAccordion.module.scss';

const PaymentMethodAccordion = ({
  expanded,
  setExpanded,
  handleChangeAccordion,
  orderedProductsInfo,
  orderId,
}) => {
  const isPaymentMethodExpended = expanded === PANEL.PAYMENT_METHOD;
  const actualPrice =
    orderedProductsInfo.totalDiscountPrice || orderedProductsInfo.totalPrice;

  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [expDateText, setExpDateText] = useState(EXP_DATE_TEXT.DEFAULT);
  const [card, setCard] = useState(EMPTY_PAYMENT_CARD);
  const [disabledAccordion, setDisabledAccordion] = useContext(CheckoutContext);

  const { cardNumber, expDate, cvv, cardHolder } = card;

  const handleFieldChange = (e) => {
    const { cardItem, text } = handleCardItem(e.target);

    text && setExpDateText(text);
    setCard({ ...card, ...cardItem });
  };

  const checkValidity = useCallback(() => {
    for (const key in card) {
      const { value, error } = card[key];

      if ((!value || error) && key !== 'cardHolder') return setIsValid(false);
    }

    return setIsValid(true);
  }, [card]);

  const makePayment = async () => {
    setIsLoading(true);
    try {
      await paymentApi.send({
        paymentAmount: actualPrice,
        cardNumber: cardNumber.value,
        expDate: expDate.value,
        cvv: cvv.value,
        cardHolder: cardHolder.value,
        orderId,
      });
      setDisabledAccordion({
        info: true,
        address: true,
        payment: true,
        confirmation: false,
      });
      setExpanded(PANEL.ORDER_CONFIRMATION);
    } catch (err) {
      toast.error(ERROR.SOMETHING_WENT_WRONG);
    }
    setIsLoading(false);
  };

  useEffect(() => checkValidity(), [checkValidity]);

  return (
    <Accordion
      disabled={disabledAccordion.payment}
      className={classNames({
        [styles.accordionSummary]: !isPaymentMethodExpended,
        [styles.accordion]: true,
      })}
      expanded={isPaymentMethodExpended}
      onChange={handleChangeAccordion(PANEL.PAYMENT_METHOD)}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        data-testid="PaymentMethodAccordion"
      >
        <Box className={styles.header}>
          <PaymentsRoundedIcon className={styles.icon} />
          <Box>
            <Typography className={styles.subtitle} variant="subtitle2">
              Payment method
            </Typography>
          </Box>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        {isLoading ? (
          <Spinner height={'400px'} />
        ) : (
          <>
            <Box className={styles.cardIcons}>
              <Maestro />
              <Mastercard />
              <Visa />
              <VisaElectron />
            </Box>
            <Box onChange={handleFieldChange}>
              <StandardTextField
                id="cardNumber"
                labelText="Card Number"
                error={cardNumber.error}
                value={formatCardNumber(cardNumber.value)}
                helperText={'Enter sixteen digits'}
              />
              <StandardTextField
                id="expDate"
                labelText="Expiration Date"
                error={expDate.error}
                value={expDate.value}
                helperText={expDateText}
              />
              <StandardTextField
                id="cvv"
                labelText="CVV"
                error={cvv.error}
                value={cvv.value}
                helperText="Last three digits on the card back"
              />
              <StandardTextField
                id="cardHolder"
                labelText="Card Holder"
                value={cardHolder.value}
                helperText="Leave the field blank if card has not name"
              />
            </Box>
            <Button
              fullWidth
              className={styles.button}
              variant="contained"
              disabled={!isValid}
              onClick={makePayment}
            >{`Pay ${actualPrice} $`}</Button>
          </>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

PaymentMethodAccordion.propTypes = {
  orderedProductsInfo: PropTypes.object.isRequired,
  handleChangeAccordion: PropTypes.func.isRequired,
  expanded: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  setExpanded: PropTypes.func.isRequired,
  orderId: PropTypes.number,
};

export default PaymentMethodAccordion;

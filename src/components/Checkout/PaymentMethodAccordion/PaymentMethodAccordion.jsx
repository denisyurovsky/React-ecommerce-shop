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
import React from 'react';

import { PANEL } from '../constants/constants';
import AccordionSummary from '../helpers/AccordionSummary';

import styles from './PaymentMethodAccordion.module.scss';

const PaymentMethodAccordion = ({
  expanded,
  handleChangeAccordion,
  orderedProductsInfo,
  isDisabled,
}) => {
  const isPaymentMethodExpended = expanded === PANEL.PAYMENT_METHOD;
  const actualPrice =
    orderedProductsInfo.totalDiscountPrice || orderedProductsInfo.totalPrice;

  return (
    <Accordion
      disabled={isDisabled}
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
        <Button
          fullWidth
          className={styles.button}
          variant="contained"
        >{`Pay ${actualPrice} $`}</Button>
      </AccordionDetails>
    </Accordion>
  );
};

PaymentMethodAccordion.propTypes = {
  orderedProductsInfo: PropTypes.object.isRequired,
  handleChangeAccordion: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  expanded: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
};

export default PaymentMethodAccordion;

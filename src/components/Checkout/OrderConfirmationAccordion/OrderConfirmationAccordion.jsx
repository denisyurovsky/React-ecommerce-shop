import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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

import styles from './OrderConfirmationAccordion.module.scss';

const OrderConfirmationAccordion = ({
  expanded,
  isDisabled,
  handleChangeAccordion,
}) => {
  const isOrderConfirmationExpended = expanded === PANEL.ORDER_CONFIRMATION;

  return (
    <Accordion
      className={classNames({
        [styles.accordionSummary]: !isOrderConfirmationExpended,
        [styles.accordion]: true,
      })}
      disabled={isDisabled}
      expanded={isOrderConfirmationExpended}
      onChange={handleChangeAccordion(PANEL.ORDER_CONFIRMATION)}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box className={styles.header}>
          <CheckRoundedIcon className={styles.icon} />
          <Box>
            <Typography className={styles.subtitle} variant="subtitle2">
              Order confirmation
            </Typography>
          </Box>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Button
          disabled
          fullWidth
          className={styles.button}
          variant="contained"
        >
          Proceed
        </Button>
      </AccordionDetails>
    </Accordion>
  );
};

OrderConfirmationAccordion.propTypes = {
  handleChangeAccordion: PropTypes.func.isRequired,
  expanded: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  isDisabled: PropTypes.bool,
};

OrderConfirmationAccordion.defaultProps = {
  isDisabled: true,
};

export default OrderConfirmationAccordion;

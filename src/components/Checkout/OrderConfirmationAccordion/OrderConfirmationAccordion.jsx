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
import React, { useContext } from 'react';

import { pathNames } from '../../../constants/pathNames';
import { CheckoutContext } from '../../../pages/CheckoutPage/CheckoutPage';
import { Title } from '../../Title/Title';
import Link from '../../ui-kit/Link/Link';
import { PANEL } from '../constants/constants';
import AccordionSummary from '../helpers/AccordionSummary';

import styles from './OrderConfirmationAccordion.module.scss';

const { PROFILE, ORDERS } = pathNames;

const OrderConfirmationAccordion = ({ expanded, handleChangeAccordion }) => {
  const isOrderConfirmationExpended = expanded === PANEL.ORDER_CONFIRMATION;
  const { accessToken } = localStorage;

  const [disabledAccordion] = useContext(CheckoutContext);

  return (
    <Accordion
      className={classNames({
        [styles.accordionSummary]: !isOrderConfirmationExpended,
        [styles.accordion]: true,
      })}
      disabled={disabledAccordion.confirmation}
      expanded={isOrderConfirmationExpended}
      onChange={handleChangeAccordion(PANEL.ORDER_CONFIRMATION)}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        data-testid="OrderConfirmation"
      >
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
        <Title> Thank you!</Title>
        <Typography
          className={styles.subtitle}
          variant="subtitle2"
          data-testid={'ConfirmationText'}
        >
          The order has been successfully paid.
          {accessToken && ' Navigate to the Orders page to view the details.'}
        </Typography>
        {accessToken && (
          <Link to={PROFILE + ORDERS}>
            <Button fullWidth className={styles.button} variant="contained">
              Go to the Orders page
            </Button>
          </Link>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

OrderConfirmationAccordion.propTypes = {
  handleChangeAccordion: PropTypes.func.isRequired,
  expanded: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
};

export default OrderConfirmationAccordion;

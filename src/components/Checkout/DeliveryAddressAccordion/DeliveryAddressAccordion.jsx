import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import EditIcon from '@mui/icons-material/Edit';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import {
  Accordion,
  AccordionDetails,
  Box,
  Typography,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';

import { CheckoutContext } from '../../../pages/CheckoutPage/CheckoutPage';
import { PANEL } from '../constants/constants';
import AccordionSummary from '../helpers/AccordionSummary';

import AccordionSummaryInfo from './AccordionSummaryInfo/AccordionSummaryInfo';
import Label from './Label/Label';

import styles from './DeliveryAddressAccordion.module.scss';

const DeliveryAddressAccordion = ({
  isDeliveryAddressExpended,
  handleDeliveryAddressButton,
  handleChangeAddresses,
  addressId,
  handleEditButton,
  handleChangeAccordion,
  addresses,
  address,
}) => {
  const [disabledAccordion] = useContext(CheckoutContext);

  return (
    <>
      <Accordion
        className={classNames({
          [styles.accordionSummary]: !isDeliveryAddressExpended,
          [styles.accordion]: true,
        })}
        expanded={isDeliveryAddressExpended}
        onChange={handleChangeAccordion(PANEL.DELIVERY_ADDRESS)}
      >
        <AccordionSummary
          disabled={disabledAccordion.address}
          expandIcon={
            isDeliveryAddressExpended ? <ArrowDropDownIcon /> : <EditIcon />
          }
          data-testid="deliveryAddressSummery"
        >
          <Box className={styles.header}>
            <LocalShippingIcon className={styles.icon} />
            <Box>
              <Typography className={styles.subtitle} variant="subtitle2">
                Delivery address
              </Typography>
              {!isDeliveryAddressExpended && addressId !== null && (
                <AccordionSummaryInfo address={address} />
              )}
            </Box>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl className={styles.formControl}>
            <RadioGroup
              className={styles.radioGroup}
              onChange={handleChangeAddresses}
              value={addressId}
            >
              {addresses.data.length > 0 &&
                addresses.data.map((address) => (
                  <FormControlLabel
                    className={styles.formControlLabel}
                    key={address.id}
                    value={address.id}
                    control={<Radio />}
                    label={
                      <Label
                        handleEditButton={handleEditButton}
                        address={address}
                      />
                    }
                  />
                ))}
            </RadioGroup>
          </FormControl>
          <Button
            onClick={handleDeliveryAddressButton}
            fullWidth
            className={styles.button}
            variant="contained"
            disabled={addressId === null}
          >
            Proceed
          </Button>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

DeliveryAddressAccordion.propTypes = {
  handleDeliveryAddressButton: PropTypes.func.isRequired,
  handleChangeAddresses: PropTypes.func.isRequired,
  handleEditButton: PropTypes.func.isRequired,
  handleChangeAccordion: PropTypes.func.isRequired,
  addresses: PropTypes.object.isRequired,
  address: PropTypes.object.isRequired,
  isDeliveryAddressExpended: PropTypes.bool.isRequired,
  addressId: PropTypes.number,
};

export default DeliveryAddressAccordion;

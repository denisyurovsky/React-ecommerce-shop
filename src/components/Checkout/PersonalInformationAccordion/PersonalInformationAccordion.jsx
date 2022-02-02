import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ContactPageOutlinedIcon from '@mui/icons-material/ContactPageOutlined';
import EditIcon from '@mui/icons-material/Edit';
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

import PersonalInformation from '../../AddressBook/PersonalInformation/PersonalInformation';
import { PANEL } from '../constants/constants';
import AccordionSummary from '../helpers/AccordionSummary';

import styles from './PersonalInformationAccordion.module.scss';

const PersonalInformationAccordion = ({
  expanded,
  handleChangeAccordion,
  address,
  isPersonalInformationValid,
  handlePersonalInformationButton,
  setAddress,
  handleChange,
}) => {
  const { title, name, surname, phone } = address;
  const isPersonalInformationExpended = expanded === PANEL.PERSONAL_INFORMATION;

  return (
    <Accordion
      className={classNames({
        [styles.accordionSummary]: !isPersonalInformationExpended,
        [styles.accordion]: true,
      })}
      expanded={isPersonalInformationExpended}
      onChange={handleChangeAccordion(PANEL.PERSONAL_INFORMATION)}
    >
      <AccordionSummary
        expandIcon={
          isPersonalInformationExpended ? <ArrowDropDownIcon /> : <EditIcon />
        }
        data-testid="personalInformationSummery"
      >
        <Box className={styles.header}>
          <ContactPageOutlinedIcon className={styles.icon} />
          <Box>
            <Typography className={styles.subtitle} variant="subtitle2">
              Personal information
            </Typography>
            {expanded !== PANEL.PERSONAL_INFORMATION &&
              isPersonalInformationValid && (
                <Box className={styles.body}>
                  <Typography variant="caption" data-testid="fullName">
                    {title} {name} {surname}
                  </Typography>
                  <Typography variant="caption">{phone}</Typography>
                </Box>
              )}
          </Box>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <PersonalInformation
          handleChange={handleChange}
          address={address}
          setAddress={setAddress}
        />
        <Button
          onClick={handlePersonalInformationButton}
          fullWidth
          className={styles.button}
          variant="contained"
          disabled={!isPersonalInformationValid}
          data-testid="personalInformationButton"
        >
          Proceed
        </Button>
      </AccordionDetails>
    </Accordion>
  );
};

PersonalInformationAccordion.propTypes = {
  handleChangeAccordion: PropTypes.func.isRequired,
  address: PropTypes.object.isRequired,
  handlePersonalInformationButton: PropTypes.func.isRequired,
  setAddress: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  expanded: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  isPersonalInformationValid: PropTypes.bool,
};

export default PersonalInformationAccordion;

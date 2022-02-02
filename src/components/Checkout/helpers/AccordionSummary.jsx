import MuiAccordionSummary from '@mui/material/AccordionSummary';
import { styled } from '@mui/material/styles';
import React from 'react';

const AccordionSummary = styled((props) => <MuiAccordionSummary {...props} />)(
  () => ({
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(0deg)',
    },
  })
);

export default AccordionSummary;

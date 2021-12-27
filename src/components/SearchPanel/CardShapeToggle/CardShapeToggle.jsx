import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { pageView } from '../../../pages/ProductListPage/constants/constants';

export default function CardShapeToggle({ setFilterProperties, className }) {
  const [cardShape, setCardShape] = useState(pageView.LIST_VIEW);

  const handleCardShape = (event, newCardShape) => {
    setCardShape(newCardShape);
    setFilterProperties((prev) => ({
      ...prev,
      cardShape: newCardShape,
    }));
  };

  return (
    <ToggleButtonGroup
      className={className}
      value={cardShape}
      exclusive
      onChange={handleCardShape}
      aria-label="card shape"
    >
      <ToggleButton
        value={pageView.LIST_VIEW}
        aria-label={pageView.MODULE_VIEW}
      >
        <ViewListIcon color="primary" />
      </ToggleButton>
      <ToggleButton
        value={pageView.MODULE_VIEW}
        aria-label={pageView.MODULE_VIEW}
      >
        <ViewModuleIcon color="primary" />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

CardShapeToggle.propTypes = {
  setFilterProperties: PropTypes.func.isRequired,
  className: PropTypes.string,
};

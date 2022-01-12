import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import PropTypes from 'prop-types';
import React from 'react';

import { pageView } from '../../../pages/ProductListPage/constants/constants';

export default function CardShapeToggle({
  cardShape,
  setCardShape,
  className,
}) {
  const { LIST_VIEW, MODULE_VIEW } = pageView;

  const handleCardShape = (event, newCardShape) => {
    if (newCardShape !== null) {
      setCardShape(newCardShape);
    }
  };

  return (
    <ToggleButtonGroup
      className={className}
      value={cardShape}
      exclusive
      onChange={handleCardShape}
      aria-label="card shape"
    >
      <ToggleButton value={LIST_VIEW} aria-label={LIST_VIEW}>
        <ViewListIcon color="primary" />
      </ToggleButton>
      <ToggleButton value={MODULE_VIEW} aria-label={MODULE_VIEW}>
        <ViewModuleIcon color="primary" />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

CardShapeToggle.propTypes = {
  cardShape: PropTypes.string.isRequired,
  setCardShape: PropTypes.func.isRequired,
  className: PropTypes.string,
};

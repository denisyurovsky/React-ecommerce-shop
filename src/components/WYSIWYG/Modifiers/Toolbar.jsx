import { Box, Stack, StepConnector } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

import { useWindowSize } from '../../../hooks/useWindowSize';
import { BREAKPOINTS } from '../constants';

import BlockModifiers from './BlockModifiers/BlockModifiers';
import EmailModifier from './EmailModifier/EmailModifier';
import InlineModifiers from './InlineModifiers/InlineModifiers';
import LinkModifier from './LinkModifier/LinkModifier';
import TableModifier from './TableModifier/TableModifier';

import styles from '../textEditor.module.scss';

const Toolbar = ({
  editorState,
  handleChange,
  isAnchorInTable,
  setIsInteracted,
  isExtraSpace,
  resetRerender,
}) => {
  const { width } = useWindowSize();

  return (
    <Box className={styles.modifiers}>
      <Stack direction="row" spacing={width > BREAKPOINTS.NAVIGATION ? 2 : 1}>
        <InlineModifiers state={editorState} handleChange={handleChange} />
        <BlockModifiers
          state={editorState}
          handleChange={handleChange}
          disabled={isAnchorInTable}
        />
        <LinkModifier
          state={editorState}
          handleChange={handleChange}
          setIsInteracted={setIsInteracted}
          disabled={isExtraSpace}
        />
        <EmailModifier
          state={editorState}
          handleChange={handleChange}
          setIsInteracted={setIsInteracted}
          disabled={isExtraSpace}
        />
        <TableModifier
          state={editorState}
          handleChange={handleChange}
          setIsInteracted={setIsInteracted}
          disabled={isAnchorInTable || isExtraSpace}
          resetRerender={resetRerender}
        />
      </Stack>
      <StepConnector sx={{ m: '1rem -1rem 0' }} />
    </Box>
  );
};

Toolbar.propTypes = {
  editorState: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  isAnchorInTable: PropTypes.bool.isRequired,
  setIsInteracted: PropTypes.func.isRequired,
  isExtraSpace: PropTypes.bool.isRequired,
  resetRerender: PropTypes.func.isRequired,
};

export default Toolbar;

import { TipsAndUpdatesOutlined } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { useWindowSize } from '../../hooks/useWindowSize';

import {
  EDITOR_MAX_SYMBOLS,
  MAX_LENGTH_MESSAGE,
  BREAKPOINTS,
  EDITOR_WARN_SYMBOLS,
} from './constants';

import styles from './textEditor.module.scss';

const EditorFooter = ({
  symbolsLeft,
  isFocused,
  isAnchorInTable,
  errorText,
}) => {
  const isError = symbolsLeft === 0 || Boolean(errorText);

  const helperText = symbolsLeft === EDITOR_MAX_SYMBOLS ? `Total: ` : `Left: `;

  const { width } = useWindowSize();
  const isTablet = width > BREAKPOINTS.FOOTER;

  const enter = <code className={styles.code}>Enter</code>;
  const shift = <code className={styles.code}>Shift</code>;
  const message = isTablet ? ` to add a new line` : '';

  return (
    <Box data-testid="editor-footer" className={styles.footer}>
      {isAnchorInTable && (
        <Box className={styles.message}>
          {isTablet && <TipsAndUpdatesOutlined className={styles.icon} />}
          <Typography>
            Use {enter} + {shift} {message}
          </Typography>
        </Box>
      )}
      {!isError ? (
        <Typography
          className={classNames({
            [styles.symbols]: true,
            [styles.focused]: isFocused,
          })}
        >
          {helperText}
          <span
            data-testid="left-number"
            className={classNames({
              [styles.warning]: symbolsLeft < EDITOR_WARN_SYMBOLS,
            })}
          >
            {symbolsLeft}
          </span>
        </Typography>
      ) : (
        <Typography
          className={classNames({
            [styles.symbols]: true,
            [styles.warning]: true,
            [styles.focused]: isFocused,
          })}
        >
          {symbolsLeft > 0 ? errorText : MAX_LENGTH_MESSAGE}
        </Typography>
      )}
    </Box>
  );
};

EditorFooter.propTypes = {
  symbolsLeft: PropTypes.number.isRequired,
  isFocused: PropTypes.bool.isRequired,
  isAnchorInTable: PropTypes.bool,
  errorText: PropTypes.string,
};

export default EditorFooter;

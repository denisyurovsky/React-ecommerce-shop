import DeleteIcon from '@mui/icons-material/Delete';
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  IconButton,
  Box,
} from '@mui/material';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import { formatFileSize } from '../../../helpers/utils/formatData';

import styles from './FilesList.module.scss';

export const FilesList = ({ filesList, handleImageDelete }) => {
  if (!filesList.length) {
    return null;
  }

  return (
    <Box className={styles.list}>
      <Typography className={styles.title} variant="h6" component="div">
        Selected images:
      </Typography>
      <List>
        {filesList.map((item, index) => {
          const handleImageClick = () => {
            handleImageDelete(index);
          };

          return (
            <ListItem
              data-testid="imgItem"
              key={_.uniqueId('image_')}
              className={styles.item}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  data-testid="delete"
                  onClick={handleImageClick}
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemAvatar>
                <img
                  src={item.previewURL}
                  alt={item.name}
                  className={styles.preview}
                />
              </ListItemAvatar>
              <ListItemText
                primary={`${item.name} - ${formatFileSize(item.size)}`}
              />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

FilesList.propTypes = {
  filesList: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleImageDelete: PropTypes.func.isRequired,
};

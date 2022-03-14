import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CropIcon from '@mui/icons-material/Crop';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  IconButton,
  Box,
  Button,
} from '@mui/material';
import classNames from 'classnames';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import { formatFileSize } from '../../../helpers/formatData';
import Spinner from '../../ui-kit/Spinner/Spinner';
import { STATUS } from '../constants';

import styles from './FilesList.module.scss';

const { CROPPED, CROPPING } = STATUS;

export const FilesList = ({
  setCroppedImage,
  filesList,
  handleImageDelete,
  isImagesLoad,
}) => {
  const getIcon = (status) => {
    switch (status) {
      case CROPPED:
        return <CheckCircleIcon sx={{ mr: 2 }} />;
      case CROPPING:
        return <CropIcon sx={{ mr: 2 }} />;
      default:
        return null;
    }
  };

  if (!filesList.length) {
    return null;
  }

  if (isImagesLoad) {
    return <Spinner />;
  }

  return (
    <Box className={styles.list}>
      <Typography className={styles.title} variant="h6" component="div">
        Selected images:
      </Typography>
      <List>
        {filesList.map(({ file, status }, index) => {
          const sendCurrentToCrop = () => setCroppedImage(file);
          const onDelete = () => handleImageDelete(index);

          const icon = getIcon(status);
          const isCropped = status === CROPPED;

          return (
            <ListItem
              data-testid="imgItem"
              key={_.uniqueId('image_')}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  data-testid="delete"
                  onClick={onDelete}
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <Button
                className={classNames({
                  [styles.btn]: true,
                  [styles.btnSuccess]: isCropped,
                  [styles.btnCurrent]: status === CROPPING,
                })}
                onClick={sendCurrentToCrop}
                fullWidth
                endIcon={icon}
                color={isCropped ? 'success' : 'primary'}
              >
                <ListItemAvatar className={styles.previewWrapper}>
                  <img
                    src={file.previewURL}
                    alt={file.name}
                    className={styles.preview}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={`${file.name} - ${formatFileSize(file.size)}`}
                />
              </Button>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

FilesList.propTypes = {
  setCroppedImage: PropTypes.func.isRequired,
  filesList: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleImageDelete: PropTypes.func.isRequired,
  isImagesLoad: PropTypes.bool.isRequired,
};

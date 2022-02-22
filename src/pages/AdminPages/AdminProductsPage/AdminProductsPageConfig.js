import { Button } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';

import { pathNames } from '../../../helpers/constants/pathNames/pathNames';
import { DeleteProductButtonWithModal } from '../DeleteProductButtonWithModal/DeleteProductButtonWithModal';

import styles from './AdminProductsPage.module.scss';

export const columns = [
  {
    field: 'photo',
    headerAlign: 'center',
    minWidth: 150,
    align: 'center',
    renderCell: (photo) => (
      <img className={styles.image} src={photo.value} alt={photo.value} />
    ),
    headerName: 'Photo',
    flex: 1,
  },
  {
    field: 'name',
    minWidth: 150,
    headerAlign: 'center',
    headerName: 'Name',
    flex: 1,
    renderCell: (params) => {
      return (
        <Box sx={{ whiteSpace: 'initial', textAlign: 'center' }}>
          {params.value}
        </Box>
      );
    },
  },
  {
    field: 'category',
    minWidth: 150,
    headerAlign: 'center',
    align: 'center',
    headerName: 'Category',
    flex: 1,
  },
  {
    field: 'price',
    minWidth: 100,
    headerAlign: 'center',
    align: 'center',
    headerName: 'Price',
    flex: 1,
  },
  {
    field: 'rating',
    minWidth: 100,
    headerAlign: 'center',
    align: 'center',
    headerName: 'Rating',
    flex: 1,
  },
  {
    field: 'reviewsNumber',
    minWidth: 150,
    headerAlign: 'center',
    align: 'center',
    headerName: 'Reviews Number',
    flex: 1,
  },
  {
    field: 'actions',
    minWidth: 150,
    headerAlign: 'center',
    align: 'center',
    headerName: 'Actions',
    flex: 1,
    renderCell: (params) => {
      const { ADMIN, PRODUCTS, EDIT } = pathNames;

      return (
        <>
          <Button>
            <Link
              className={styles.editButton}
              to={`${ADMIN}${PRODUCTS}/${params.value.productId}${EDIT}`}
            >
              Edit
            </Link>
          </Button>
          <DeleteProductButtonWithModal
            id={params.value.productId}
            productName={params.value.productName}
          />
        </>
      );
    },
  },
];

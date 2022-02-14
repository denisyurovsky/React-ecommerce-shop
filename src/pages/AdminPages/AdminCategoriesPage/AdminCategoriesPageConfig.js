import { Button } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';

import { DeleteCategoryButtonWithModal } from '../DeleteCategoryButtonWithModal/DeleteCategoryButtonWithModal';

import styles from './AdminCategoriesPage.module.scss';

export const columns = [
  {
    field: 'category',
    align: 'center',
    minWidth: 150,
    headerAlign: 'center',
    headerName: 'Category',
    flex: 1,
  },
  {
    field: 'description',
    minWidth: 150,
    align: 'center',
    headerAlign: 'center',
    headerName: 'Description',
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
    field: 'connectedProducts',
    minWidth: 150,
    align: 'center',
    headerAlign: 'center',
    headerName: 'Connected Products',
    flex: 1,
  },
  {
    field: 'actions',
    minWidth: 150,
    align: 'center',
    headerAlign: 'center',
    headerName: 'Actions',
    flex: 1,
    renderCell: (params) => {
      return (
        <>
          <Button>
            <Link
              className={styles.editButton}
              to={`/admin/categories/${params.value.category}/edit`}
            >
              Edit
            </Link>
          </Button>
          <DeleteCategoryButtonWithModal
            products={params.value.products}
            category={params.value.category}
          />
        </>
      );
    },
  },
];

import { Button } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { AdminTable } from '../../../components/ui-kit/AdminTable/AdminTable';
import Spinner from '../../../components/ui-kit/Spinner/Spinner';
import { notificationError } from '../../../constants/constants';
import {
  getProductsByUserId,
  selectProducts,
} from '../../../store/products/productsSlice';

import { columns } from './AdminCategoriesPageConfig';

export const AdminCategoriesPage = () => {
  const dispatch = useDispatch();

  const authorId = useSelector((state) => state.user.user.id);

  useEffect(() => {
    dispatch(getProductsByUserId(authorId));
  }, [authorId, dispatch]);

  const products = useSelector(selectProducts);

  const categories = products.data.map((product) => {
    return product.category.name;
  });

  const findNumberOfConnectedProducts = (category) => {
    return findConnectedProducts(category).length;
  };

  const findConnectedProducts = (category) => {
    return products.data.filter(
      (product) => product.category.name === category
    );
  };

  const uniqueCategories = [...new Set(categories)];

  const rows = uniqueCategories.map((category) => {
    return {
      id: category,
      category: category,
      description: '',
      connectedProducts: findNumberOfConnectedProducts(category),
      actions: { category, products: findConnectedProducts(category) },
    };
  });

  const navigate = useNavigate();

  const onCreateCategory = () =>
    navigate('/admin/category/create', { replace: true });

  if (products.isLoading) {
    return <Spinner data-testid="load" />;
  }

  if (products.errorOccurred) {
    toast.error(notificationError);
  }

  return (
    <AdminTable
      tableName={'Admin Categories Page'}
      columnBuffer={4}
      autoHeight
      rowHeight={100}
      columns={columns}
      rows={rows}
    >
      <Button onClick={onCreateCategory} sx={{ mb: '20px' }} variant="outlined">
        Create new category
      </Button>
    </AdminTable>
  );
};

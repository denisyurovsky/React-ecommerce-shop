import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { getAllComments } from '../../../api/feedback';
import { requestWithAbortControl } from '../../../api/requestWithAbortControl';
import noImg from '../../../assets/images/noImg.png';
import { AdminTable } from '../../../components/ui-kit/AdminTable/AdminTable';
import Spinner from '../../../components/ui-kit/Spinner/Spinner';
import { notificationError } from '../../../constants/constants';
import { pathNames } from '../../../constants/pathNames';
import {
  getProductsByUserId,
  selectProducts,
} from '../../../store/products/productsSlice';

import { columns } from './AdminProductsPageConfig';

export const AdminProductsPage = () => {
  const [comments, setComments] = useState([]);

  const dispatch = useDispatch();

  const authorId = useSelector((state) => state.user.user.id);

  useEffect(() => {
    const abortController = new AbortController();

    dispatch(getProductsByUserId(authorId));

    const fetchAllComments = async () => {
      try {
        const response = await requestWithAbortControl(
          getAllComments,
          abortController
        );

        setComments(response.data);
      } catch (e) {
        toast.error(notificationError);
      }
    };

    fetchAllComments();

    return () => {
      abortController.abort();
    };
  }, [dispatch, authorId]);

  const products = useSelector(selectProducts);

  const findReviewsNumber = (id) => {
    const currentComments = comments.filter(
      (review) => review.productId === id
    );

    return currentComments.length;
  };

  const rows = products.data.map((product) => {
    return {
      id: product.id,
      photo: product?.images?.length ? product.images[0] : noImg,
      name: product.name,
      category: product.category.name,
      price: product.price,
      rating: product.rating || 0,
      reviewsNumber: findReviewsNumber(product.id),
      actions: { productId: product.id, productName: product.name },
    };
  });

  const navigate = useNavigate();

  const { ADMIN, PRODUCTS, CREATE } = pathNames;

  const onCreateProduct = () =>
    navigate(`${ADMIN}${PRODUCTS}${CREATE}`, { replace: true });

  if (products.isLoading) {
    return <Spinner data-testid="load" />;
  }

  if (products.errorOccurred) {
    toast.error(notificationError);
  }

  return (
    <AdminTable
      tableName={'Admin Products Page'}
      columnBuffer={7}
      autoHeight
      rowHeight={100}
      columns={columns}
      rows={rows}
    >
      <Button onClick={onCreateProduct} sx={{ mb: '20px' }} variant="outlined">
        Create new product
      </Button>
    </AdminTable>
  );
};

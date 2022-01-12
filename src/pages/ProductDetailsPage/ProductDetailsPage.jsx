import { CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getProduct } from '../../api/product';
import ProductDetailsPageContent from '../../components/ProductDetailsPageContent/ProductDetailsPageContent';
import { NotFoundPage } from '../NotFoundPage/NotFoundPage';

import styles from './ProductDetailsPage.module.scss';

const MESSAGE = {
  load: <CircularProgress data-testid="load" />,
  rejected: <NotFoundPage />,
};

export const ProductDetailsPage = () => {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [message, setMessage] = useState(MESSAGE.load);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProduct(params.id);

        setProduct(response);
      } catch (err) {
        setMessage(MESSAGE.rejected);
      }
    };

    fetchData();
  }, [params.id]);

  return (
    <div className={styles.container}>
      {product ? (
        <ProductDetailsPageContent product={product} />
      ) : (
        <Box>{message}</Box>
      )}
    </div>
  );
};

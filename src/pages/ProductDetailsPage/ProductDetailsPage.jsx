import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import { getProduct } from '../../api/product';
import ProductDetailsPageContent from '../../components/ProductDetailsPageContent/ProductDetailsPageContent';
import Spinner from '../../components/ui-kit/Spinner/Spinner';
import { NotFoundPage } from '../NotFoundPage/NotFoundPage';

import styles from './ProductDetailsPage.module.scss';

export const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchProduct = useCallback(async () => {
    try {
      const newProduct = await getProduct(id);

      setProduct(newProduct);
      setIsLoading(false);
    } catch (err) {
      setIsError(true);
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  if (isError) {
    return <NotFoundPage />;
  }

  if (isLoading) {
    return <Spinner isAbsolute />;
  }

  return (
    <div className={styles.container}>
      <ProductDetailsPageContent product={product} />
    </div>
  );
};

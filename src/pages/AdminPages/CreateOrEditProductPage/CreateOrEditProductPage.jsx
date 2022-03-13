import { Container } from '@mui/material';
import { EditorState } from 'draft-js';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { createProduct, getProduct, updateProduct } from '../../../api/product';
import BasicBreadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs';
import CreateOrEditProductContent from '../../../components/CreateOrEditProductContent/CreateOrEditProductContent';
import { Title } from '../../../components/Title/Title';
import Spinner from '../../../components/ui-kit/Spinner/Spinner';
import { pathNames } from '../../../constants/pathNames';
import { getCategories } from '../../../store/categories/categoriesSlice';

import styles from './CreateOrEditProductPage.module.scss';

const { ADMIN, PRODUCTS, CREATE } = pathNames;

export const CreateOrEditProductPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id: productId } = useParams();

  const [product, setProduct] = useState({
    name: '',
    category: {
      id: null,
      name: '',
    },
    price: null,
    discountPrice: null,
    description: EditorState.createEmpty(),
    images: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const isEditPage = useLocation().pathname.includes('edit');

  const links = [
    { url: '/', text: 'Home' },
    {
      url: `${ADMIN}${PRODUCTS}${CREATE}`,
      text: isEditPage ? 'Edit Product' : 'Create New Product',
    },
  ];

  const getProductInfo = async (id) => {
    const response = await getProduct(id);

    setProduct(response);
    setIsLoading(false);
  };

  useEffect(() => {
    dispatch(getCategories());

    if (isEditPage) {
      setIsLoading(true);
      getProductInfo(productId);
    }
  }, [dispatch, isEditPage, productId]);

  const onSubmit = async (newProduct) => {
    try {
      setIsLoading(true);

      if (isEditPage) {
        await updateProduct(productId, newProduct);
      } else {
        await createProduct(newProduct);
      }

      toast.success(
        `Product was successfully ${isEditPage ? 'edited' : 'created'}`
      );
    } catch (e) {
      toast.error('Something went wrong');
    } finally {
      navigate('/admin');
    }
  };

  const onCancel = () => navigate('/admin/products');

  if (isLoading) {
    return <Spinner isAbsolute={true} />;
  }

  return (
    <Container maxWidth="lg">
      <BasicBreadcrumbs className={styles.breadCrumbs} links={links} />
      <Title>{isEditPage ? 'Edit Product' : 'Create New Product'}</Title>
      <CreateOrEditProductContent
        product={product}
        onSubmit={onSubmit}
        onCancel={onCancel}
        isEditPage={isEditPage}
      />
    </Container>
  );
};

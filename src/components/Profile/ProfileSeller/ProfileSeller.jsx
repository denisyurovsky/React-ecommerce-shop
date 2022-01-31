import { Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import PaginationBlock from '../../../components/Pagination/Pagination';
import CardsContainer from '../../../components/ProductCard/CardsContainer/CardsContainer';
import {
  NUMBER_ITEMS_ON_PAGE,
  pageView,
  sortObj,
  sortTypes,
} from '../../../pages/ProductListPage/constants/constants';
import {
  getProducts,
  selectProducts,
} from '../../../store/products/productsSlice';

import styles from './ProfileSeller.module.scss';

function ProfileSeller({ profileId }) {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);

  const [searchParams, setSearchParams] = useState({
    entity: 'products',
    sort: sortObj[sortTypes.NEW_FIRST],
    filters: [{ userId: profileId }],
    currentPage: 1,
    itemsPerPage: NUMBER_ITEMS_ON_PAGE,
    text: null,
  });

  useEffect(() => {
    dispatch(getProducts(searchParams));
  }, [dispatch, searchParams]);

  const pageCount = Math.ceil(
    products.totalCountProducts / NUMBER_ITEMS_ON_PAGE
  );

  return (
    <>
      <div className={styles.row}>
        <Typography
          className={styles.found}
          color="primary"
          variant="subtitle2"
        >
          Found: {products.totalCountProducts} items
        </Typography>
      </div>
      <div className={styles.cardsContainer}>
        <CardsContainer
          cardShape={pageView.MODULE_VIEW}
          products={products.data}
          isLoading={products.isLoading}
          errorOccurred={products.errorOccurred}
        />
      </div>
      <PaginationBlock
        className={styles.pagination}
        pageCount={pageCount}
        setSearchParams={setSearchParams}
        currentPage={searchParams.currentPage}
      />
    </>
  );
}

ProfileSeller.propTypes = {
  profileId: PropTypes.number.isRequired,
};

export default ProfileSeller;

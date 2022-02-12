import { Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import PaginationBlock from '../../components/Pagination/Pagination';
import CardsContainer from '../../components/ProductCard/CardsContainer/CardsContainer';
import CardShapeToggle from '../../components/SearchPanel/CardShapeToggle/CardShapeToggle';
import { CategoryFilter } from '../../components/SearchPanel/CategoryFilter/CategoryFilter';
import FreeTextFilter from '../../components/SearchPanel/FreeTextFilter/FreeTextFilter';
import SortFilter from '../../components/SearchPanel/SortFilter/SortFilter';
import { ALL_CATEGORIES } from '../../helpers/constants/constants';
import { useWindowSize } from '../../hooks/useWindowSize';
import {
  getCategories,
  selectCategories,
} from '../../store/categories/categoriesSlice';
import {
  getProducts,
  selectProducts,
} from '../../store/products/productsSlice';

import {
  sortTypes,
  pageView,
  sortObj,
  NUMBER_ITEMS_ON_PAGE,
  BreadcrumbsLinks,
  MOBILE_WIDTH,
} from './constants/constants';

import styles from './ProductListPage.module.scss';

const ProductListPage = () => {
  const [cardShape, setCardShape] = useState(pageView.LIST_VIEW);
  const [searchParams, setSearchParams] = useState({
    entity: 'products',
    filters: null,
    sort: sortObj[sortTypes.NEW_FIRST],
    currentPage: 1,
    itemsPerPage: NUMBER_ITEMS_ON_PAGE,
    text: null,
  });
  const { width } = useWindowSize();
  const isMobile = width <= MOBILE_WIDTH;

  useEffect(() => {
    if (isMobile) {
      setCardShape(pageView.MODULE_VIEW);
    }
  }, [isMobile]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getProducts(searchParams));
  }, [dispatch, searchParams]);

  const products = useSelector(selectProducts);
  const categories = useSelector(selectCategories);

  const allCategories = [ALL_CATEGORIES, ...categories.data];
  const pageCount = Math.ceil(
    products.totalCountProducts / NUMBER_ITEMS_ON_PAGE
  );

  return (
    <>
      <Breadcrumbs className={styles.breadcrumbs} links={BreadcrumbsLinks} />
      <div className={styles.searchBlock}>
        <CategoryFilter
          className={styles.filter}
          allCategories={allCategories}
          isLoading={categories.isLoading}
          errorOccurred={categories.errorOccurred}
          setSearchParams={setSearchParams}
        />
        <FreeTextFilter
          className={styles.search}
          setSearchParams={setSearchParams}
        />
      </div>
      <div className={styles.row}>
        {!isMobile && (
          <CardShapeToggle
            cardShape={cardShape}
            setCardShape={setCardShape}
            className={styles.toggle}
          />
        )}
        <SortFilter setSearchParams={setSearchParams} fullWidth={isMobile} />
      </div>
      <Typography className={styles.found} color="primary" variant="subtitle2">
        Found: {products.totalCountProducts} items
      </Typography>
      <div className={styles.cardsContainer}>
        <CardsContainer
          cardShape={cardShape}
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
};

export default ProductListPage;

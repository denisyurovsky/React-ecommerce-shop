import { Checkbox, FormControlLabel, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import PaginationBlock from '../../components/Pagination/Pagination';
import CardsContainer from '../../components/ProductCard/CardsContainer/CardsContainer';
import CardShapeToggle from '../../components/SearchPanel/CardShapeToggle/CardShapeToggle';
import { CategoryFilter } from '../../components/SearchPanel/CategoryFilter/CategoryFilter';
import FreeTextFilter from '../../components/SearchPanel/FreeTextFilter/FreeTextFilter';
import SortFilter from '../../components/SearchPanel/SortFilter/SortFilter';
import { ALL_CATEGORIES } from '../../constants/constants';
import buildSearchQuery from '../../helpers/buildSearchQuery';
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
  BreadcrumbsLinks,
  defaultParams,
  MOBILE_WIDTH,
  NUMBER_ITEMS_ON_PAGE,
  pageView,
} from './constants/constants';
import getObjFromQuery from './helpers/getObjFromQuery';

import styles from './ProductListPage.module.scss';

const ProductListPage = () => {
  const location = useLocation();
  const objFromQuery = getObjFromQuery(location.search);

  const [cardShape, setCardShape] = useState(pageView.LIST_VIEW);
  const [searchParams, setSearchParams] = useState(
    objFromQuery || defaultParams
  );

  const { width } = useWindowSize();
  const isMobile = width <= MOBILE_WIDTH;

  const navigate = useNavigate();

  const checkOnlyDiscountedProducts = () => {
    const newFilters = searchParams.filters.map((filter) => {
      return 'isDiscounted' in filter
        ? { isDiscounted: !filter.isDiscounted }
        : filter;
    });

    setSearchParams({
      ...searchParams,
      filters: [...newFilters],
    });
  };

  useEffect(() => {
    if (isMobile) {
      setCardShape(pageView.MODULE_VIEW);
    }
  }, [isMobile]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const { entity, filters, sort, q, currentPage, itemsPerPage } = searchParams;

  useEffect(() => {
    const query = buildSearchQuery(
      entity,
      filters,
      sort,
      q,
      currentPage,
      itemsPerPage
    );

    navigate(query);

    dispatch(getProducts(searchParams));
  }, [
    currentPage,
    dispatch,
    entity,
    filters,
    itemsPerPage,
    navigate,
    q,
    searchParams,
    sort,
  ]);

  const products = useSelector(selectProducts);
  const categories = useSelector(selectCategories);

  const allCategories = [ALL_CATEGORIES, ...categories.data];
  const pageCount = Math.ceil(
    products.totalCountProducts / NUMBER_ITEMS_ON_PAGE
  );

  let selectedCategory = null;

  if (Array.isArray(searchParams.filters) && searchParams.filters.length) {
    selectedCategory = searchParams.filters.filter(
      (el) => 'category.name' in el
    )['category.name'];
  }

  const { totalCountProducts } = products;

  return (
    <>
      <Breadcrumbs className={styles.breadcrumbs} links={BreadcrumbsLinks} />
      <div className={styles.searchBlock}>
        <FormControlLabel
          className={styles.onlyDiscountedCheckbox}
          control={
            <Checkbox
              label="discounts"
              checked={location.search.includes('isDiscounted=true')}
              onChange={checkOnlyDiscountedProducts}
            />
          }
          label="Only discounted"
          labelPlacement="end"
        />
        <CategoryFilter
          selectedCategory={selectedCategory}
          className={styles.filter}
          allCategories={allCategories}
          isLoading={categories.isLoading}
          errorOccurred={categories.errorOccurred}
          setSearchParams={setSearchParams}
        />
        <FreeTextFilter
          selectedText={q}
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
        <SortFilter
          selectedSortType={sort}
          setSearchParams={setSearchParams}
          fullWidth={isMobile}
        />
      </div>
      <Typography className={styles.found} color="primary" variant="subtitle2">
        Found:&nbsp;
        {totalCountProducts}
        &nbsp;items
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
        currentPage={searchParams.currentPage ?? 1}
      />
    </>
  );
};

export default ProductListPage;

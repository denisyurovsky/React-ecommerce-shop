import { Typography } from '@mui/material';
import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import PaginationBlock from '../../components/Pagination/Pagination';
import CardsContainer from '../../components/ProductCard/CardsContainer/CardsContainer';
import CardShapeToggle from '../../components/SearchPanel/CardShapeToggle/CardShapeToggle';
import { CategoryFilter } from '../../components/SearchPanel/CategoryFilter/CategoryFilter';
import FreeTextFilter from '../../components/SearchPanel/FreeTextFilter/FreeTextFilter';
import SortFilter from '../../components/SearchPanel/SortFilter/SortFilter';
import {
  getCategories,
  selectCategories,
} from '../../store/categories/categoriesSlice';
import {
  getProducts,
  selectProducts,
} from '../../store/products/productsSlice';

import { sortTypes, pageView } from './constants/constants';
import filterProducts from './helper/filterProducts';

import styles from './ProductListPage.module.scss';

const ProductListPage = () => {
  const NUMBER_ITEMS_ON_PAGE = 9;
  const links = [
    { url: '/', text: 'Home' },
    { url: '/products', text: 'Products' },
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
  }, [dispatch]);

  const products = useSelector(selectProducts);
  const categories = useSelector(selectCategories);
  const allCategories = ['All Categories', ...categories.data];

  const [filterProperties, setFilterProperties] = useState({
    cardShape: pageView.LIST_VIEW,
    sort: sortTypes.NEW_FIRST,
    category: 'All Categories',
    searchValue: '',
    currentPage: 1,
  });

  const { cardShape, sort, category, searchValue, currentPage } =
    filterProperties;
  const filteredProducts = filterProducts(
    products.data,
    category,
    sort,
    searchValue
  );

  const chunkProducts = _.chunk(filteredProducts, NUMBER_ITEMS_ON_PAGE);
  const amountProducts = filteredProducts.length;
  const pageCount = Math.ceil(amountProducts / NUMBER_ITEMS_ON_PAGE);

  return (
    <>
      <Breadcrumbs links={links} />
      <div className={styles.searchBlock}>
        <CategoryFilter
          className={styles.filter}
          allCategories={allCategories}
          category={category}
          isLoading={categories.isLoading}
          errorOccurred={categories.errorOccurred}
          setFilterProperties={setFilterProperties}
        />
        <FreeTextFilter
          className={styles.search}
          setFilterProperties={setFilterProperties}
        />
      </div>
      <div className={styles.row}>
        <CardShapeToggle
          setFilterProperties={setFilterProperties}
          className={styles.toggle}
        />
        <SortFilter setFilterProperties={setFilterProperties} />
      </div>
      <Typography className={styles.found} color="primary" variant="subtitle2">
        Found: {amountProducts} items
      </Typography>
      <div className={styles.cardsContainer}>
        <CardsContainer
          cardShape={cardShape}
          products={chunkProducts[currentPage - 1]}
          isLoading={products.isLoading}
          errorOccurred={products.errorOccurred}
        />
      </div>
      <PaginationBlock
        className={styles.pagination}
        pageCount={pageCount}
        setFilterProperties={setFilterProperties}
        currentPage={currentPage}
      />
    </>
  );
};

export default ProductListPage;

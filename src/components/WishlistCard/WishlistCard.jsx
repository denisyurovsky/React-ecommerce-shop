import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Typography,
  Box,
  CardActions,
  IconButton,
  Collapse,
  TextField,
  CircularProgress,
} from '@mui/material';
import classNames from 'classnames';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import productsApi from '../../api/products';
import { MODAL_SIZES, notificationError } from '../../constants/constants';
import { UPDATE_WISHLIST_TYPE } from '../../constants/wishlists/wishlists';
import { pageView } from '../../pages/ProductListPage/constants/constants';
import {
  getWishlistsStatus,
  updateWishlists,
} from '../../store/user/userSlice';
import { FetchStatus } from '../../ts/enums/enums';
import CardsContainer from '../ProductCard/CardsContainer/CardsContainer';
import Modal from '../ui-kit/Modal/Modal';

import { DEFAULT_LABEL_INPUT, ERROR_LABEL_INPUT } from './constants';

import styles from './WishlistCard.module.scss';

const WishlistCard = ({
  wishlist,
  changeExpandedWishlist,
  checkIsNameUnique,
}) => {
  const { productIds, isExpanded, id } = wishlist;
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState(wishlist.name);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const status = useSelector(getWishlistsStatus);
  const handleExpandClick = () => {
    changeExpandedWishlist(isExpanded ? null : wishlist.id);
  };

  const handleDeleteClick = () => {
    openModal(name);
  };

  const handleEditClick = () => {
    setIsEdit(!isEdit);
  };

  const handleNameBlur = (event) => {
    if (!checkIsNameUnique(name)) {
      return;
    }
    const updateAction = {
      type: UPDATE_WISHLIST_TYPE.RENAME,
      argument: {
        id: wishlist.id,
        newName: event.target.value,
      },
    };

    dispatch(updateWishlists(updateAction));
    setIsEdit(!isEdit);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmationDelete = () => {
    const updateAction = {
      type: UPDATE_WISHLIST_TYPE.DELETE,
      argument: name,
    };

    dispatch(updateWishlists(updateAction));
  };

  useEffect(() => {
    const filteredProducts = products.filter((product) =>
      productIds.includes(product.id)
    );

    setProducts(filteredProducts);
    const newProductIds = _.differenceBy(
      productIds,
      products.map((product) => product.id)
    );

    if (isExpanded && newProductIds.length) {
      const getWishListProducts = async (productIds) => {
        try {
          const response = await productsApi.getProductsByIds(productIds);

          setProducts((products) => products.concat(response.data));
          setIsLoading(false);
        } catch (err) {
          toast(notificationError);
        }
      };

      getWishListProducts(newProductIds);
    }
  }, [isExpanded, productIds]); // eslint-disable-line

  useEffect(() => {
    if (status === FetchStatus.Fulfilled) {
      setIsModalOpen(false);
    }
  }, [status]);

  return (
    <Box className={styles.wishlistCard}>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleConfirmationDelete}
        cancelButtonLabel="No"
        actionButtonLabel={
          status === FetchStatus.Pending ? (
            <CircularProgress
              style={{ width: '25px', height: '25px', color: '#bdbdbd' }}
            />
          ) : (
            'Yes'
          )
        }
        size={MODAL_SIZES.SMALL}
      >
        <Typography align="center">
          Are you sure you want to remove
          <br />
          {`"${name}" wishlist?`}
        </Typography>
      </Modal>
      <div className={styles.header}>
        <IconButton
          className={classNames({
            [styles.expandIcon]: true,
            [styles.expanded]: isExpanded,
          })}
          expand={isExpanded.toString()}
          onClick={handleExpandClick}
          aria-expanded={isExpanded}
          data-testid="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
        <Box className={styles.title}>
          {isEdit ? (
            <TextField
              id="outlined-multiline-static"
              error={!checkIsNameUnique(name, id)}
              label={
                checkIsNameUnique(name, id)
                  ? DEFAULT_LABEL_INPUT
                  : ERROR_LABEL_INPUT
              }
              data-testid="edit-wishlist-name"
              defaultValue={name}
              size="small"
              onChange={handleNameChange}
              onBlur={handleNameBlur}
              inputProps={{ maxLength: 150 }}
            />
          ) : (
            <Typography className={styles.name} data-testid="wishlist-name">
              {name}
            </Typography>
          )}
          <CardActions>
            <IconButton
              className={styles.button}
              edge="end"
              data-testid="edit"
              onClick={handleEditClick}
            >
              <EditIcon className={styles.icon} />
            </IconButton>
            {id !== '0' && (
              <IconButton
                className={styles.button}
                edge="end"
                aria-label="delete"
                data-testid="delete"
                onClick={handleDeleteClick}
              >
                <DeleteIcon className={styles.icon} />
              </IconButton>
            )}
          </CardActions>
        </Box>
      </div>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        className={styles.collapse}
      >
        <CardsContainer
          cardShape={pageView.MODULE_VIEW}
          products={products}
          isLoading={isLoading}
        />
      </Collapse>
    </Box>
  );
};

WishlistCard.propTypes = {
  wishlist: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    productIds: PropTypes.arrayOf(PropTypes.number),
    isExpanded: PropTypes.bool,
  }).isRequired,
  changeExpandedWishlist: PropTypes.func,
  checkIsNameUnique: PropTypes.func,
};

export default WishlistCard;

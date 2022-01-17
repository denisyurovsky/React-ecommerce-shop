import { ExpandMore } from '@mui/icons-material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import Collapse from '@mui/material/Collapse';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { toast } from 'react-toastify';

import { getProductsByIds } from '../../../api/products';
import noImg from '../../../assets/images/noImg.png';
import {
  notificationError,
  laptopBreakPoint,
} from '../../../helpers/constants/constants';
import {
  orderStatus,
  orderState,
} from '../../../helpers/constants/orderStatus';
import {
  formatDateWithFullMonth,
  formatPrice,
  formatDateWithShortMonth,
} from '../../../helpers/utils/formatData';
import { useWindowSize } from '../../../hooks/useWindowSize';
import { selectOrders } from '../../../store/orders/ordersSlice';
import { OrderButton } from '../OrderButton/OrderButton';

import { OrderDeliveryDate } from './OrderDeliveryDate/OrderDeliveryDate';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import styles from './OrderCard.module.scss';

const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
  <ArrowBackIosNewIcon
    {...props}
    className={classNames(
      'slick-prev',
      'slick-arrow',
      currentSlide === slideCount - 1 ? ' slick-disabled' : ''
    )}
    aria-hidden="true"
    aria-disabled={currentSlide === slideCount - 1 ? true : false}
    type="button"
  />
);

const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
  <ArrowForwardIosIcon
    {...props}
    className={classNames(
      'slick-next',
      'slick-arrow',
      currentSlide === slideCount - 1 ? ' slick-disabled' : ''
    )}
    aria-hidden="true"
    aria-disabled={currentSlide === slideCount - 1 ? true : false}
    type="button"
  />
);

SlickArrowRight.propTypes = {
  currentSlide: PropTypes.any,
  slideCount: PropTypes.any,
};

SlickArrowLeft.propTypes = {
  currentSlide: PropTypes.any,
  slideCount: PropTypes.any,
};

export function orderSlider(slides) {
  var settings = {
    dots: false,
    infinite: false,
    arrows: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SlickArrowRight />,
    prevArrow: <SlickArrowLeft />,
    responsive: [
      {
        breakpoint: laptopBreakPoint + 200,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: laptopBreakPoint - 100,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return <Slider {...settings}>{slides}</Slider>;
}

export const OrderCard = ({ orderId: id }) => {
  const { width } = useWindowSize();
  const orders = useSelector(selectOrders);

  const [expanded, setExpanded] = useState(false);
  const [orderProducts, setOrderProducts] = useState([]);
  const index = orders.orders.findIndex((ord) => ord.id === id);

  const {
    createdAt: creationDate,
    totalPrice: price,
    deliveredAt: deliveryDate,
    deliveryAddress,
    status,
  } = orders.orders[index];

  const lessThanDelivered = status < orderState.DELIVERED;

  const getProductsForImages = async (imagesIds, abortController) => {
    try {
      const response = await getProductsByIds(imagesIds, {
        signal: abortController.signal,
      });

      if (!abortController.signal.aborted) setOrderProducts(response.data);
    } catch (err) {
      toast.error(notificationError);
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    const imagesIds = orders.orders
      .find((order) => order.id === id)
      .products.map((item) => item.originalProductId);

    getProductsForImages(imagesIds, abortController);

    return () => {
      setOrderProducts([]);
      abortController.abort();
    };
  }, [orders, id]);

  const handleExpandClick = () => setExpanded(!expanded);

  const sliderElements = orderProducts.map((product) => {
    return (
      <Link to={`/products/${product.id}`} key={product.id}>
        <CardMedia
          component="img"
          image={product.images.length ? product.images[0] : noImg}
          alt={product.name}
          className={'none'}
        />
      </Link>
    );
  });

  return (
    <Card className={styles.card}>
      <CardActions className={styles.collapseButton}>
        <Box className={styles.outerInformation}>
          <Box className={styles.dateInformation}>
            <Typography className={styles.orderDate}>
              Ordered on{' '}
              {width > laptopBreakPoint
                ? formatDateWithFullMonth(creationDate)
                : formatDateWithShortMonth(creationDate)}
            </Typography>
            <Typography fontSize={width > laptopBreakPoint ? '12px' : '10px'}>
              Order #{id}
            </Typography>
          </Box>
          <Box>
            <Typography
              className={classNames(
                styles.deliveryMark,
                styles[`deliveryMark${status}`]
              )}
            >
              {width > laptopBreakPoint
                ? orderStatus[status].deliveryStatus
                : ''}
            </Typography>
          </Box>
        </Box>
        <Box className={styles.priceInformation}>
          <Typography className={styles.orderPrice}>
            {formatPrice(price)} &thinsp;
          </Typography>
          <ExpandMore
            className={styles.showMoreButton}
            expand={expanded.toString()}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </Box>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Box className={styles.collapseInner}>
          <CardContent className={styles.cardContent}>
            <Box className={styles.description}>
              <Box className={styles.deliveryInforamtion}>
                <Typography className={styles.deliveryDestination}>
                  Delivery type:
                  <span className={styles.deliveryValue}>
                    Courier service delivery
                  </span>
                </Typography>
                <Typography className={styles.deliveryDestination}>
                  Delivery address:
                  <span className={styles.deliveryValue}>
                    {deliveryAddress}
                  </span>
                </Typography>
              </Box>
              {lessThanDelivered ? (
                <OrderButton
                  className={styles.actionButton}
                  orderIndex={index}
                  status={status}
                />
              ) : (
                <OrderDeliveryDate
                  status={status}
                  deliveryDate={deliveryDate}
                />
              )}
            </Box>
          </CardContent>
          <Box className={styles.sliderContainer}>
            {orderSlider(sliderElements)}
          </Box>
          {lessThanDelivered ? (
            <OrderButton
              className={styles.mobileActionButton}
              orderIndex={index}
              status={status}
            />
          ) : (
            <OrderDeliveryDate
              status={status}
              deliveryDate={deliveryDate}
              breakpointDisplayed={width < laptopBreakPoint}
            />
          )}
        </Box>
      </Collapse>
    </Card>
  );
};

OrderCard.propTypes = {
  orderId: PropTypes.number,
};

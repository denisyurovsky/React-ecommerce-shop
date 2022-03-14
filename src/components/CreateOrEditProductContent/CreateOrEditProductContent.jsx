import { Box, Button } from '@mui/material';
import { convertToRaw } from 'draft-js';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import CategorySelection from './Inputs/CategorySelection';
import DescriptionEditor from './Inputs/DescriptionEditor';
import ImagesInput from './Inputs/ImagesInput';
import NameInput from './Inputs/NameInput';
import PriceGroup from './Inputs/PriceGroup';

import styles from './CreateOrEditProductContent.module.scss';

const CreateOrEditProductContent = ({
  product,
  onSubmit,
  onCancel,
  isEditPage,
}) => {
  const [item, setItem] = useState({
    ...product,
    category: product.category.name,
    price: {
      original: product.price,
      discount: product.discountPrice,
    },
  });
  const [isValid, setIsValid] = useState({
    name: isEditPage,
    category: isEditPage,
    description: isEditPage,
    images: true,
    price: isEditPage,
    default: false,
  });

  const createOrEditProduct = () => {
    const jsonText = JSON.stringify(
      convertToRaw(item.description.getCurrentContent())
    );

    onSubmit({
      ...item,
      description: jsonText,
      price: item.price.original,
      discountPrice: item.price.discount,
      rating: null,
    });
  };

  const pageFields = [
    {
      name: 'name',
      component: (args) => <NameInput {...args} />,
      value: item.name,
    },
    {
      name: 'category',
      component: (args) => <CategorySelection {...args} />,
      value: item.category,
    },
    {
      name: 'description',
      component: (args) => <DescriptionEditor {...args} />,
      value: item.description,
    },
    {
      name: 'images',
      component: (args) => <ImagesInput {...args} />,
      value: item.images,
    },
    {
      name: 'price',
      component: (args) => <PriceGroup {...args} />,
      value: item.price,
    },
  ];

  const isFinished = !Object.values(isValid).includes(false);

  return (
    <form>
      <Box className={styles.box}>
        {pageFields.map(({ name, component, value }) => {
          const key = name;

          const onChange = (result) => {
            setIsValid({ ...isValid, [name]: true, default: true });
            setItem({ ...item, [name]: result });
          };

          const disableSubmit = () => {
            if (!isValid[name]) return;

            setIsValid({ ...isValid, [name]: false });
          };

          return component({ key, value, onChange, disableSubmit });
        })}
        <Box className={styles.wrapperForButtons}>
          <Button onClick={onCancel} type="reset" variant="outlined">
            Cancel
          </Button>
          <Button
            disabled={!isFinished}
            onClick={createOrEditProduct}
            variant="contained"
          >
            {isEditPage ? 'Edit' : 'Create'}
          </Button>
        </Box>
      </Box>
    </form>
  );
};

CreateOrEditProductContent.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  product: PropTypes.shape({
    name: PropTypes.string,
    category: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
    price: PropTypes.number,
    discountPrice: PropTypes.number,
    description: PropTypes.object,
    images: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  isEditPage: PropTypes.bool.isRequired,
};

export default CreateOrEditProductContent;

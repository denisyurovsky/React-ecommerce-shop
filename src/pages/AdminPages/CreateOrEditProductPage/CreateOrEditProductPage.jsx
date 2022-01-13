import {
  Box,
  CircularProgress,
  Container,
  InputLabel,
  MenuItem,
  Select,
  styled,
  TextField,
} from '@mui/material';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { createProduct, getProduct, updateProduct } from '../../../api/product';
import BasicBreadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs';
import { Title } from '../../../components/Title/Title';
import checkForLatinText from '../../../helpers/checkForLatinText';
import checkForOnlyNumbers from '../../../helpers/checkForOnlyNumbers';
import {
  getCategories,
  selectCategories,
} from '../../../store/categories/categoriesSlice';

import styles from './CreateOrEditProductPage.module.scss';

export const CreateOrEditProductPage = () => {
  const [values, setValues] = useState({
    name: '',
    category: ' ',
    description: '',
    price: '',
    serverCategories: [],
    createdAt: 0,
    isLoading: false,
  });

  const [checkValues, setCheckValues] = useState({
    isNameValid: true,
    isDescriptionValid: true,
    isPriceValid: true,
  });

  const [isFinished, setIsFinished] = useState(false);

  const navigate = useNavigate();

  const authorId = useSelector((state) => state.user.user.id);

  const params = useParams();

  const Input = styled('input')({
    display: 'none',
  });

  const date = new Date();

  const isEditPage = useLocation().pathname.includes('edit');

  const postNewProduct = async (name, description, category, price) => {
    setValues({ ...values, isLoading: true });

    const newProduct = {
      name,
      description,
      category: {
        name: category,
      },
      price,
      userId: authorId,
      createdAt: date.toISOString(),
      updatedAt: date.toISOString(),
    };

    const response = await createProduct(newProduct);

    if (response.status === 201) {
      toast.success('Product was successfully created');
      navigate('/admin');
    }
  };

  const editProduct = async (name, description, category, price) => {
    setValues({ ...values, isLoading: true });
    const editedProduct = {
      name,
      description,
      category: {
        name: category,
      },
      price,
      userId: authorId,
      createdAt: values.createdAt.toString(),
      updatedAt: date.toISOString(),
    };

    const response = await updateProduct(params.id, editedProduct);

    if (response.status === 200) {
      toast.success('Product was successfully edited');
      navigate('/admin');
    }
  };

  const getProductInfo = async () => {
    const response = await getProduct(params.id);

    setValues({
      ...values,
      name: response.name,
      category: response.category.name,
      description: response.description,
      price: response.price,
      isLoading: false,
      createdAt: response.createdAt,
    });
  };

  const checkIsFinished = (name, category, description, price) => {
    return (
      checkForLatinText(name) &&
      checkValues.isNameValid &&
      category.length > 2 &&
      checkForLatinText(description) &&
      checkValues.isDescriptionValid &&
      price.length !== 0 &&
      checkForOnlyNumbers(price)
    );
  };

  const dispatch = useDispatch();

  useEffect(() => {
    isEditPage ? getProductInfo() : null;
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch(getCategories());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setIsFinished(
      checkIsFinished(
        values.name,
        values.category,
        values.description,
        values.price
      )
    );
    // eslint-disable-next-line
  }, [values.name, values.category, values.description, values.price]);

  const categories = useSelector(selectCategories);

  const onNameChange = (e) => {
    setValues({
      ...values,
      name: e.target.value,
    });

    setCheckValues({
      ...checkValues,
      isNameValid:
        checkForLatinText(e.target.value) && e.target.value.length !== 0,
    });
  };

  const onCategoryChange = (e) => {
    setValues({ ...values, category: e.target.value });
  };

  const onDescriptionChange = (e) => {
    setValues({
      ...values,
      description: e.target.value,
    });

    setCheckValues({
      ...checkValues,
      isDescriptionValid:
        checkForLatinText(e.target.value) &&
        e.target.value.length !== 0 &&
        e.target.value.length <= 1000,
    });
  };

  const onPriceChange = (e) => {
    setValues({
      ...values,
      price: e.target.value,
    });

    setCheckValues({
      ...checkValues,
      isPriceValid: checkForOnlyNumbers(e.target.value),
    });
  };

  const postOrEditProduct = () => {
    isEditPage
      ? editProduct(
          values.name,
          values.description,
          values.category,
          values.price
        )
      : postNewProduct(
          values.name,
          values.description,
          values.category,
          values.price
        );
  };

  const onCancel = () => {
    navigate('/admin/products');
  };

  const links = [
    { url: '/', text: 'Home' },
    {
      url: '/admin/products/create',
      text: isEditPage ? 'Edit Product' : 'Create New Product',
    },
  ];

  if (values.isLoading) {
    return <CircularProgress data-testid="load" />;
  } else {
    return (
      <Container className={styles.container} maxWidth="lg">
        <BasicBreadcrumbs className={styles.breadCrumbs} links={links} />
        <Title>{isEditPage ? 'Edit Product' : 'Create New Product'}</Title>
        <form>
          <Box className={styles.box}>
            <TextField
              helperText={
                !checkValues.isNameValid ? 'Only latin characters' : null
              }
              value={values.name}
              data-testid="nameInput"
              error={!checkValues.isNameValid}
              fullWidth
              label="Name"
              onChange={onNameChange}
            />
            <FormControl error={!values.category}>
              <InputLabel id="selectLabel">Category</InputLabel>
              <Select
                value={values.category}
                selected_value={values.category}
                data-testid="selectInput"
                labelId="selectLabel"
                id="selectLabel"
                onChange={onCategoryChange}
                fullWidth
                label="Category"
              >
                <MenuItem value="">None</MenuItem>
                {categories.data.map((category) => {
                  return (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <TextField
              helperText={
                !checkValues.isDescriptionValid
                  ? 'Only latin characters, max length 1000 characters'
                  : null
              }
              value={values.description}
              data-testid="descriptionInput"
              error={!checkValues.isDescriptionValid}
              label="Description"
              multiline
              rows={3}
              onChange={onDescriptionChange}
            />
            <label htmlFor="images-upload">
              <Input
                id="images-upload"
                disabled={!values.description}
                accept="image/*"
                multiple
                type="file"
              />
              <Button
                data-testid="imageInput"
                className={styles.uploadButton}
                fullWidth
                variant="outlined"
                component="span"
              >
                Choose images to upload
              </Button>
            </label>
            <TextField
              helperText={!checkValues.isPriceValid ? 'Only numbers' : null}
              value={values.price}
              data-testid="priceInput"
              error={!checkValues.isPriceValid}
              fullWidth
              label="Price"
              onChange={onPriceChange}
            />
            <Box className={styles.wrapperForButtons}>
              <Button onClick={onCancel} type="reset" variant="outlined">
                Cancel
              </Button>
              <Button
                disabled={!isFinished}
                onClick={postOrEditProduct}
                variant="contained"
              >
                {isEditPage ? 'Edit' : 'Create'}
              </Button>
            </Box>
          </Box>
        </form>
      </Container>
    );
  }
};

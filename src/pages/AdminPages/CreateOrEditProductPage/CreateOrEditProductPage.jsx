import {
  Box,
  CircularProgress,
  Container,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import { convertToRaw, EditorState } from 'draft-js';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { createProduct, getProduct, updateProduct } from '../../../api/product';
import BasicBreadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs';
import { ImagesUploader } from '../../../components/ImagesUploader/ImagesUploader';
import { Title } from '../../../components/Title/Title';
import createDecorator from '../../../components/WYSIWYG/Decorators/Decorators';
import TextEditor from '../../../components/WYSIWYG/TextEditor';
import { pathNames } from '../../../constants/pathNames';
import checkForLatinText from '../../../helpers/checkForLatinText';
import checkForOnlyNumbers from '../../../helpers/checkForOnlyNumbers';
import { convertBase64ArrayOfImages } from '../../../helpers/convertBase64';
import {
  getCategories,
  selectCategories,
} from '../../../store/categories/categoriesSlice';
import { NotFoundPage } from '../../NotFoundPage/NotFoundPage';

import {
  DESCRIPTION_ERROR,
  NOT_FOUND_PRODUCT_ERROR,
  PRICE_ERROR,
} from './constants';

import styles from './CreateOrEditProductPage.module.scss';

export const CreateOrEditProductPage = () => {
  const [values, setValues] = useState({
    name: '',
    category: '',
    price: '',
    discountPrice: '',
    serverCategories: [],
    isLoading: false,
  });

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [imagesBase64, setImagesBase64] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [isImagesValid, setIsImagesValid] = useState(true);
  const [checkValues, setCheckValues] = useState({
    isNameValid: true,
    isCategoryValid: true,
    isDescriptionValid: true,
    isPriceValid: true,
    isDiscountPriceValid: true,
  });

  const [errorOccurred, setErrorOccurred] = useState(false);

  const [isFinished, setIsFinished] = useState(false);
  const navigate = useNavigate();
  const authorId = useSelector((state) => state.user.user.id);
  const params = useParams();
  const isEditPage = useLocation().pathname.includes('edit');

  const postNewProduct = async (
    name,
    description,
    category,
    price,
    discountPrice = 0
  ) => {
    setValues({ ...values, isLoading: true });
    const newProduct = {
      name,
      description,
      category: {
        name: category,
      },
      price: Number(price),
      discountPrice: Number(discountPrice),
      isDiscounted: Boolean(discountPrice),
      userId: authorId,
      images: imagesBase64,
    };
    const response = await createProduct(newProduct);

    if (response.status === 201) {
      toast.success('Product was successfully created');
      navigate('/admin');
    }
  };

  const editProduct = async (
    name,
    description,
    category,
    price,
    discountPrice = 0
  ) => {
    setValues({ ...values, isLoading: true });
    const editedProduct = {
      name,
      description,
      category: {
        name: category,
      },
      price,
      discountPrice,
      isDiscounted: Boolean(discountPrice),
      userId: authorId,
      images: imagesBase64,
    };

    const response = await updateProduct(params.id, editedProduct);

    if (response.status === 200) {
      toast.success('Product was successfully edited');
      navigate('/admin');
    }
  };

  const getProductInfo = async () => {
    try {
      const response = await getProduct(params.id);

      setEditorState(
        EditorState.moveSelectionToEnd(
          EditorState.createWithContent(response.description, createDecorator())
        )
      );
      setValues({
        ...values,
        name: response.name,
        category: response.category.name,
        price: response.price,
        discountPrice: response.discountPrice,
        isLoading: false,
        createdAt: response.createdAt,
      });
      setImageUrls(response.images);
    } catch (e) {
      toast.error(NOT_FOUND_PRODUCT_ERROR);
      setErrorOccurred(true);
    }
  };

  const checkIsFinished = (
    name,
    category,
    description,
    price,
    discountPrice = 0
  ) => {
    return (
      checkForLatinText(name) &&
      checkValues.isNameValid &&
      checkValues.isCategoryValid &&
      values.category !== '' &&
      checkForLatinText(description) &&
      checkValues.isDescriptionValid &&
      price.length !== 0 &&
      checkForOnlyNumbers(price) &&
      (checkForOnlyNumbers(discountPrice) || discountPrice == '') &&
      isImagesValid
    );
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (isEditPage) {
      getProductInfo();
    }
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
        editorState.getCurrentContent().getPlainText(''),
        values.price,
        values.discountPrice,
        editorState.getCurrentContent().getPlainText(''),
        values.price
      )
    );
    // eslint-disable-next-line
  }, [
    values.name,
    values.category,
    editorState,
    values.price,
    values.discountPrice,
    isImagesValid,
  ]);

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
    setCheckValues({
      ...checkValues,
      isCategoryValid: e.target.value !== '',
    });
  };

  const onDescriptionChange = (state) => {
    const plainText = state.getCurrentContent().getPlainText('');

    setEditorState(state);
    setCheckValues({
      ...checkValues,
      isDescriptionValid: checkForLatinText(plainText),
    });
  };

  const updateImages = async (files, isValid) => {
    if (!isValid) {
      return setIsImagesValid(false);
    }

    const convertedFiles = await convertBase64ArrayOfImages(files);

    setIsImagesValid(true);
    setImagesBase64(convertedFiles);
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

  const onDiscountPriceChange = (e) => {
    setValues({
      ...values,
      discountPrice: e.target.value,
    });

    setCheckValues({
      ...checkValues,
      isDiscountPriceValid:
        (checkForOnlyNumbers(e.target.value) || !e.target.value) &&
        Number(values.price) > Number(e.target.value),
    });
  };

  const postOrEditProduct = () => {
    const jsonText = JSON.stringify(
      convertToRaw(editorState.getCurrentContent())
    );

    isEditPage
      ? editProduct(
          values.name,
          jsonText,
          values.category,
          Number(values.price),
          Number(values.discountPrice)
        )
      : postNewProduct(
          values.name,
          jsonText,
          values.category,
          Number(values.price),
          Number(values.discountPrice)
        );
  };

  const onCancel = () => {
    navigate('/admin/products');
  };

  const { ADMIN, PRODUCTS, CREATE } = pathNames;

  const links = [
    { url: '/', text: 'Home' },
    {
      url: `${ADMIN}${PRODUCTS}${CREATE}`,
      text: isEditPage ? 'Edit Product' : 'Create New Product',
    },
  ];

  if (errorOccurred) {
    return <NotFoundPage />;
  }

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
              helperText={!checkValues.isNameValid ? DESCRIPTION_ERROR : null}
              value={values.name}
              data-testid="nameInput"
              error={!checkValues.isNameValid}
              fullWidth
              label="Name"
              onChange={onNameChange}
            />
            <FormControl error={!checkValues.isCategoryValid}>
              <InputLabel id="selectLabel">Category</InputLabel>
              <Select
                value={values.category || ''}
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
            <TextEditor
              label="Description"
              data-testid="descriptionInput"
              editorState={editorState}
              setEditorState={onDescriptionChange}
              error={!checkValues.isDescriptionValid}
              helperText={
                !checkValues.isDescriptionValid ? DESCRIPTION_ERROR : null
              }
              isEdit={isEditPage}
            />
            <ImagesUploader updateImages={updateImages} imageUrls={imageUrls} />
            <TextField
              helperText={!checkValues.isPriceValid ? PRICE_ERROR : null}
              value={values.price}
              data-testid="priceInput"
              error={!checkValues.isPriceValid}
              fullWidth
              label="Price"
              onChange={onPriceChange}
            />
            <TextField
              helperText={
                !checkValues.isDiscountPriceValid
                  ? values.discountPrice >= values.price
                    ? 'Discount should be less than price'
                    : 'Only numbers'
                  : null
              }
              value={values.discountPrice}
              data-testid="discountPriceInput"
              error={!checkValues.isDiscountPriceValid}
              fullWidth
              label="Discount price"
              onChange={onDiscountPriceChange}
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

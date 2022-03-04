import { Container } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { notificationError } from '../../../constants/constants';
import checkImageValidity from '../../../helpers/checkImageValidity';
import convertBase64 from '../../../helpers/convertBase64';
import { updateUser, getUser } from '../../../store/user/userSlice';
import ImageCrop from '../../ImagesUploader/ImageCrop/ImageCrop';
import Avatar from '../../ui-kit/Avatar/Avatar';

const ProfileAvatar = () => {
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const imgInput = useRef();
  const [imageForCrop, setImageForCrop] = useState();
  const [avatar, setAvatar] = useState(user.avatar);

  const uploadImage = async (file) => {
    const fileToUpload = addPreviewURL(file);

    setImageForCrop(fileToUpload);
  };

  const resetCroppedImage = () => {
    URL.revokeObjectURL(imageForCrop);
    setImageForCrop(null);
  };

  const addPreviewURL = (file) => {
    file.previewURL = URL.createObjectURL(file);

    return file;
  };

  const getFileAfterCrop = async (croppedFile) => {
    try {
      const base64 = await convertBase64(croppedFile);

      setAvatar(base64);

      dispatch(updateUser({ ...user, avatar: base64 }));

      resetCroppedImage();
    } catch (error) {
      toast.error(notificationError);
    }

    URL.revokeObjectURL(imageForCrop);
  };

  const changeImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const imageValidity = checkImageValidity(file);

    if (imageValidity.result) {
      uploadImage(file);
    } else {
      toast.error(imageValidity.message);
    }

    e.target.value = '';
  };

  const handleImage = () => imgInput.current.click();

  const needCrop = Boolean(imageForCrop);

  return (
    <>
      <Avatar isProfile avatar={avatar} onClick={handleImage} />
      <input
        data-testid="imageInput"
        ref={imgInput}
        type="file"
        name="myImage"
        style={{ display: 'none' }}
        onChange={changeImage}
      />
      <Container sx={{ width: '75%' }}>
        {needCrop && (
          <ImageCrop
            imgFile={imageForCrop}
            passFile={getFileAfterCrop}
            resetCroppedImage={resetCroppedImage}
            imageHeight={500}
            imageWidth={500}
          />
        )}
      </Container>
    </>
  );
};

ProfileAvatar.propTypes = {
  id: PropTypes.number,
  avatar: PropTypes.string,
};

export default ProfileAvatar;

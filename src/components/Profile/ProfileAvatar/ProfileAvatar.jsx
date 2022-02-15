import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import checkImageValidity from '../../../helpers/checkImageValidity/checkImageValidity';
import convertBase64 from '../../../helpers/convertBase64';
import { updateUser } from '../../../store/user/userSlice';
import Avatar from '../../ui-kit/Avatar/Avatar';

const ProfileAvatar = ({ id, avatar }) => {
  const imgInput = useRef();
  const dispatch = useDispatch();

  const uploadImage = async (file) => {
    const base64 = await convertBase64(file);

    dispatch(updateUser({ id, avatar: base64 }));
  };

  const changeImage = (e) => {
    const file = e.target.files[0];
    const imageValidity = checkImageValidity(file);

    imageValidity.result
      ? uploadImage(file)
      : toast.error(imageValidity.message);
  };

  const handleImage = () => imgInput.current.click();

  return (
    <>
      <Avatar isProfile avatar={avatar} onClick={handleImage} />
      <input
        ref={imgInput}
        type="file"
        name="myImage"
        style={{ display: 'none' }}
        onChange={changeImage}
      />
    </>
  );
};

ProfileAvatar.propTypes = {
  id: PropTypes.number,
  avatar: PropTypes.string,
};

export default ProfileAvatar;

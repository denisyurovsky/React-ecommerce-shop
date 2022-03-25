import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { SUCCESS } from '../../../constants/constants';
import {
  MODAL_TYPE,
  RUSSIA,
} from '../../../pages/AddressBookPage/constants/constants';
import addressType from '../../../propTypes/addressType';
import {
  addAddress,
  editAddress,
} from '../../../store/addresses/addressesSlice';
import { getUser } from '../../../store/user/userSlice';
import { FetchStatus } from '../../../ts/enums/enums';
import Modal from '../../ui-kit/Modal/Modal';
import DeliveryAddress from '../DeliveryAddress/DeliveryAddress';
import PersonalInformation from '../PersonalInformation/PersonalInformation';

const CreateOrEditAddressModal = ({
  modalType,
  isOpenModal,
  handleCloseModal,
  setAddress,
  address,
}) => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const [isDisabled, setIsDisabled] = useState(true);
  const isZipLengthValid =
    address.country.name === RUSSIA ? address.zip.length === 6 : true;

  useEffect(() => {
    const isDisabled = !(
      address.title &&
      address.name &&
      address.surname &&
      address.country.name &&
      address.city &&
      address.street &&
      address.building &&
      address.phone.length === 16 &&
      address.zip &&
      isZipLengthValid
    );

    setIsDisabled(isDisabled);
  }, [address, isZipLengthValid]);

  const handleChange = (e) => {
    const { id, name, value } = e.target;

    setAddress({
      ...address,
      [id || name]: value,
    });
  };

  const handleAdd = () => {
    dispatch(addAddress({ address, user })).then((res) => {
      if (res.meta.requestStatus === FetchStatus.Fulfilled) {
        toast.success(SUCCESS.ADDRESS_ADDED);
        handleCloseModal();
      }
    });
  };

  const handleEdit = () => {
    dispatch(editAddress(address)).then((res) => {
      if (res.meta.requestStatus === FetchStatus.Fulfilled) {
        toast.success(SUCCESS.ADDRESS_EDITED);
        handleCloseModal();
      }
    });
  };

  const isAddAction = modalType === MODAL_TYPE.ADD;

  return (
    <Modal
      isOpen={isOpenModal}
      onClose={handleCloseModal}
      title={isAddAction ? 'Add address' : 'Edit address'}
      actionButtonLabel={isAddAction ? 'add' : 'save'}
      onConfirm={isAddAction ? handleAdd : handleEdit}
      isActionButtonDisabled={isDisabled}
    >
      <PersonalInformation
        handleChange={handleChange}
        setAddress={setAddress}
        address={address}
      />
      <DeliveryAddress
        handleChange={handleChange}
        setAddress={setAddress}
        address={address}
      />
    </Modal>
  );
};

CreateOrEditAddressModal.propTypes = {
  modalType: PropTypes.oneOf([MODAL_TYPE.ADD, MODAL_TYPE.EDIT]).isRequired,
  isOpenModal: PropTypes.bool.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  setAddress: PropTypes.func.isRequired,
  address: addressType.isRequired,
};

export default CreateOrEditAddressModal;

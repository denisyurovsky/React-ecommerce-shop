import { Button } from '@mui/material';
import React, { useState } from 'react';

import CreateOrEditAddressModal from '../../components/AddressBook/CreateOrEditAddressModal/CreateOrEditAddressModal';
import {
  EMPTY_ADDRESS,
  MODAL_TYPE,
} from '../../pages/AddressBookPage/constants/constants';

const CreateOrEditAddressModalWrapper = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [address, setAddress] = useState(EMPTY_ADDRESS);
  const handleOpen = () => setIsOpen(true);

  return (
    <>
      <Button onClick={handleOpen}>Modal</Button>
      <CreateOrEditAddressModal
        modalType={MODAL_TYPE.ADD}
        isOpenModal={isOpen}
        handleCloseModal={() => {}}
        setAddress={setAddress}
        address={address}
      />
    </>
  );
};

export default CreateOrEditAddressModalWrapper;

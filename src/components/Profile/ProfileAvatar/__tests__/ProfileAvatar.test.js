import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import renderWith from '../../../../test-utils/renderWith';
import ProfileAvatar from '../ProfileAvatar';

const file1 = new File(['(⌐□_□)'], 'image_1.png', { type: 'image/png' });
const file2 = new File(['(⌐□__123131344□)'], 'image_2.jpg', {
  type: 'image/jpg',
});

const storeWithImage = {
  user: {
    user: {
      avatar: file1,
    },
  },
};

const storeWithoutImage = {
  user: {
    user: {
      avatar: '',
    },
  },
};

describe('ProfileAvatar component', () => {
  it('Uploads new avatar in profile without avatar', async () => {
    renderWith(<ProfileAvatar />, storeWithoutImage);

    const avatarInput = screen.getByTestId('imageInput');

    userEvent.upload(avatarInput, file1);

    expect(avatarInput.files[0].name).toBe('image_1.png');

    const cropButton = await screen.findByText('Crop');

    userEvent.click(cropButton);

    const avatar = await screen.findByAltText('avatar');

    expect(avatar).toBeInTheDocument();
  });

  it('Uploads new avatar in profile with avatar', async () => {
    renderWith(<ProfileAvatar />, storeWithImage);

    const initialAvatar = await screen.findByAltText('avatar');

    const initialImageSrc = initialAvatar.src;

    expect(initialAvatar).toBeInTheDocument();

    const avatarInput = screen.getByTestId('imageInput');

    userEvent.upload(avatarInput, file2);

    expect(avatarInput.files[0].name).toBe('image_2.jpg');

    const cropButton = await screen.findByText('Crop');

    userEvent.click(cropButton);

    const newAvatar = await screen.findByTestId('ProfileAvatar');

    expect(newAvatar).toBeInTheDocument();

    const newImageSrc = newAvatar.src;

    const imageEquality = newImageSrc === initialImageSrc;

    expect(imageEquality).toBe(false);
  });
});

import { screen } from '@testing-library/react';
import React from 'react';

import users from '../../../../test-utils/dto/usersDto';
import render from '../../../../test-utils/renderWith';
import ProfileAvatar from '../ProfileAvatar';

const { id, avatar } = users[1].user;

describe('ProfileAvatar component', () => {
  it('should download image', async () => {
    render(<ProfileAvatar id={id} avatar={avatar} />);

    expect(screen.getByAltText('avatar').src).toContain('profile1');
  });
});

import React from 'react';

import { authStatus, ERROR } from '../../../../constants/authConstants';

import SignIn from './SignIn';

const { IDLE, LOCKED, PENDING, REJECTED, FULFILLED } = authStatus;

export default {
  title: 'AuthModal/SignIn',
  component: SignIn,
  argTypes: { sendForm: { action: 'Sending form' } },
};

const Template = (args) => <SignIn {...args} />;

export const Default = Template.bind({});
Default.args = {
  status: IDLE,
  errorMessage: '',
};

export const Success = Template.bind({});
Success.args = {
  status: FULFILLED,
  errorMessage: '',
};

export const Loading = Template.bind({});
Loading.args = {
  status: PENDING,
  errorMessage: '',
};

export const Wrong = Template.bind({});
Wrong.storyName = 'Wrong credentials';
Wrong.args = {
  status: REJECTED,
  errorMessage: ERROR.LOGIN,
};

export const Locked = Template.bind({});
Locked.storyName = 'Many attempts';
Locked.args = {
  status: LOCKED,
  errorMessage: ERROR.LOCK,
};

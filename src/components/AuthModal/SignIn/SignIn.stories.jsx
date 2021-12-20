import React from 'react';

import SignIn from './SignIn';

export default {
  title: 'AuthModal/SignIn',
  component: SignIn,
  argTypes: { sendForm: { action: 'Sending form' } },
};

const Template = (args) => <SignIn {...args} />;

export const Default = Template.bind({});
Default.args = {
  status: 'idle',
  errorMessage: 'Incorrect login or password',
};

export const Success = Template.bind({});
Success.args = {
  status: 'succeeded',
  errorMessage: 'Incorrect login or password',
};

export const Loading = Template.bind({});
Loading.args = {
  status: 'loading',
  errorMessage: 'Incorrect login or password',
};

export const Wrong = Template.bind({});
Wrong.storyName = 'Wrong credentials';
Wrong.args = {
  status: 'failed',
  errorMessage: 'Incorrect login or password',
};

export const Locked = Template.bind({});
Locked.storyName = 'Many attempts';
Locked.args = {
  status: 'failed',
  errorMessage: 'Incorrect login or password',
};

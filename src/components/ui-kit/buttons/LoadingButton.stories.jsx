import React from 'react';

import LoadingButton from './LoadingButton';

export default {
  title: 'UI/BUTTONS/Loading',
  component: LoadingButton,
};

const Template = (args) => <LoadingButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Ready to send',
};

export const Full = Template.bind({});
Full.storyName = 'Full width';
Full.args = {
  label: 'Ready to send',
  isFullWidth: true,
};

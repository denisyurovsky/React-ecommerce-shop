import React from 'react';

import CustomLoadingButton from './CustomLoadingButton';

export default {
  title: 'UI/BUTTONS/Loading',
  component: CustomLoadingButton,
};

const Template = (args) => <CustomLoadingButton {...args} />;

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

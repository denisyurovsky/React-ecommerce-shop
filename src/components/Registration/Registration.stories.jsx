import React from 'react';

import Registration from './Registration';

export default {
  title: 'Registration',
  component: Registration,
  argTypes: {},
};

const Template = (args) => <Registration {...args} />;

export const RegistrationMain = Template.bind({});
RegistrationMain.args = {};

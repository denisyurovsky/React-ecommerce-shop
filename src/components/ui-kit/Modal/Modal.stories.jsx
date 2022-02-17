import React from 'react';

import Modal from './Modal';

export default {
  title: 'UI-KIT/Modal',
  component: Modal,
  argTypes: {
    onClose: { action: 'close' },
    onConfirm: { action: 'confirm' },
  },
};

const Template = (args) => <Modal {...args} />;

export const Default = Template.bind({});
Default.args = {
  isOpen: true,
  children: <h1>Modal window</h1>,
};

export const WithLabel = Template.bind({});
WithLabel.args = {
  isOpen: true,
  children: <div>Modal window</div>,
  title: 'Header',
};

export const WithOneButton = Template.bind({});
WithOneButton.args = {
  isOpen: true,
  children: <div>Modal window</div>,
  actionButtonLabel: 'Done',
};

export const WithTwoButtons = Template.bind({});
WithTwoButtons.args = {
  isOpen: true,
  children: <div>Modal window</div>,
  actionButtonLabel: 'Done',
  cancelButtonLabel: 'Cancel',
};

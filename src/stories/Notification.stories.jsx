import React from 'react';

import { Notification } from '../components/Notification/Notification.stories';

export default {
  title: 'Notification',
  component: Notification,
  args: { status: 'error', message: `Done! You've got notification.` },
};

export const Default = (args) => <Notification {...args} />;

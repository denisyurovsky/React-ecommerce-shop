import React from 'react';

import { App } from '../components/App/App';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'App',
  component: App,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <App {...args} />;

export const AppMain = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
AppMain.args = {};

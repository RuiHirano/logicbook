// src/components/Task.stories.js

import React from 'react';
import { Story, Meta } from '@storybook/react'
import MainAppBar, { Props } from '../components/MainAppBar';

export default {
  component: MainAppBar,
  title: 'Components/MainAppBar',
};

const Template: Story<Props> = args => <div style={{ height: window.innerHeight }}><MainAppBar {...args} /></div>;

export const Default = Template.bind({})
Default.args = {
}

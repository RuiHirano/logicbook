// src/components/Task.stories.js

import React from 'react';
import { Story, Meta } from '@storybook/react'
import Footer, { Props } from '../components/Footer';

export default {
  component: Footer,
  title: 'Components/Footer',
};

const Template: Story<Props> = args => <div style={{ height: window.innerHeight }}><Footer {...args} /></div>;

export const Default = Template.bind({})
Default.args = {
}

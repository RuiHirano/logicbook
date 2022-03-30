// src/components/Task.stories.js

import React from 'react';
import { Story, Meta } from '@storybook/react'
import LogTerminal, { Props } from '../components/LogTerminal';

export default {
  component: LogTerminal,
  title: 'Components/LogTerminal',
};

const Template: Story<Props> = args => <div style={{ height: window.innerHeight }}><LogTerminal {...args} /></div>;

export const Default = Template.bind({})
Default.args = {
  text: "text\ntext\ntext\ntext\ntext\ntext\ntext\ntext\ntext\ntext",
  loading: false,
}

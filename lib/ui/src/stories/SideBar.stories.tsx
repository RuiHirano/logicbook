// src/components/Task.stories.js

import React from 'react';
import { Story, Meta } from '@storybook/react'
import SideBar, { Props } from '../components/SideBar';

export default {
  component: SideBar,
  title: 'Components/SideBar',
};

const Template: Story<Props> = args => <div style={{ height: window.innerHeight }}><SideBar {...args} /></div>;

export const Default = Template.bind({})
Default.args = {
  logics: [
    {
      name: "logic1",
    }
  ],
  onLogicClick: () => { console.log("clicked") }
}

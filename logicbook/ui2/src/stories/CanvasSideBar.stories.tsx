// src/components/Task.stories.js

import React from 'react';
import { Story, Meta } from '@storybook/react'
import CanvasSideBar, { Props } from '../components/CanvasSideBar';

export default {
  component: CanvasSideBar,
  title: 'Components/CanvasSideBar',
};

const Template: Story<Props> = args => <div style={{ height: window.innerHeight }}><CanvasSideBar {...args} /></div>;

export const Default = Template.bind({})
Default.args = {
  logic: {
    id: 0,
    type: 'class',
    name: 'Sample Class',
    description: 'Sample Description',
    module_file_path: '',
    module_file_name: '',
  },
  open: true,
  onClickClose: () => { },
}

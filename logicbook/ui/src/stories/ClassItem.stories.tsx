// src/components/Task.stories.js

import React from 'react';
import { Story, Meta } from '@storybook/react'
import ClassItem, { Props } from '../components/ClassItem';

export default {
  component: ClassItem,
  title: 'Components/ClassItem',
};

const Template: Story<Props> = args => <div style={{ height: window.innerHeight }}><ClassItem {...args} /></div>;

export const Default = Template.bind({})
Default.args = {
  logic: {
    id: 0,
    type: 'class',
    name: 'Sample Class',
    description: 'Sample Description',
    module_file_path: '',
    module_file_name: '',
  }
}

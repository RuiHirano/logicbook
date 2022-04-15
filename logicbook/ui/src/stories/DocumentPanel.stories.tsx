// src/components/Task.stories.js

import React from 'react';
import { Story, Meta } from '@storybook/react'
import DocumentPanel, { Props } from '../components/DocumentPanel';

export default {
  component: DocumentPanel,
  title: 'Components/DocumentPanel',
};

const Template: Story<Props> = args => <div style={{ height: window.innerHeight }}><DocumentPanel {...args} /></div>;

export const Default = Template.bind({})
Default.args = {
  onSave: () => { console.log("save") },
  logic: {
    name: "logic1",
    tests: [{
      filename: "test1.py",
      name: "Test of Logic1",
      status: "success",
      code: "code1",
    }, {
      filename: "test2.py",
      name: "Test of Logic2",
      status: "failure",
      code: "code2",
    }]
  },
}

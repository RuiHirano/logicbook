// src/components/Task.stories.js

import React from 'react';
import { Story, Meta } from '@storybook/react'
import TestPanel, { Props } from '../components/TestPanel';

export default {
  component: TestPanel,
  title: 'Components/TestPanel',
};

const Template: Story<Props> = args => <div style={{ height: window.innerHeight }}><TestPanel {...args} /></div>;

export const Default = Template.bind({})
Default.args = {
  logic: {
    name: "logic1",
    tests: [{
      filename: "test1.py",
      name: "Test of Logic1",
      status: "success",
      code: "code1",
      result: "ok",
    }, {
      filename: "test2.py",
      name: "Test of Logic2",
      status: "failure",
      code: "code2",
      result: "ok",
    }]
  },
  onExecuteTest: (test: any) => { console.log("executed", test) },
  onExecuteAllTest: () => { console.log("executed all") },
}

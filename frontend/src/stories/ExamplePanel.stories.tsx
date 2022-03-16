// src/components/Task.stories.js

import React from 'react';
import { Story, Meta } from '@storybook/react'
import ExamplePanel, { Props } from '../components/ExamplePanel';

export default {
  component: ExamplePanel,
  title: 'Components/ExamplePanel',
};

const Template: Story<Props> = args => <div style={{ height: window.innerHeight }}><ExamplePanel {...args} /></div>;

export const Default = Template.bind({})
Default.args = {
  logic: {
    name: "logic1",
    examples: [{
      name: "example1",
      input: {
        "a": "1",
        "b": "2",
      },
    }, {
      name: "example2",
      input: {
        "a": "3",
        "b": "5",
      }
    }]
  },
  onExecute: (input: any) => { console.log("executed", input); return Number(input.a) + Number(input.b); },
}

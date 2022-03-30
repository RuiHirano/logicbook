// src/components/Task.stories.js

import React from 'react';
import { Story, Meta } from '@storybook/react'
import Loading, { Props } from '../components/Loading';

export default {
  component: Loading,
  title: 'Components/Loading',
};

const Template: Story<Props> = args => <div style={{ height: window.innerHeight }}><Loading {...args} /></div>;

export const Default = Template.bind({})
Default.args = {
  logic: {
    name: "logic1",
    examples: [{
      name: "example1",
      args: {
        "a": "1",
        "b": "2",
      },
    }, {
      name: "example2",
      args: {
        "a": "3",
        "b": "5",
      }
    }]
  },
  onExecute: (args: any) => { console.log("executed", args); return Number(args.a) + Number(args.b); },
}

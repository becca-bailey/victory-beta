import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import VictoryLine from './src/victory-line';

export default {
  title: 'VictoryLine',
  component: VictoryLine,
} as ComponentMeta<typeof VictoryLine>;

const Template: ComponentStory<typeof VictoryLine> = args => (
  <VictoryLine {...args} />
);

export const Demo = Template.bind({});

Demo.args = {
  data: [
    { x: 1, y: 1 },
    { x: 2, y: 3 },
    { x: 3, y: 2 },
    { x: 4, y: 4 },
  ],
};

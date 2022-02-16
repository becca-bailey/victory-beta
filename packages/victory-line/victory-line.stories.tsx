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

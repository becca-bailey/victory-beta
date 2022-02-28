import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import VictoryLine from './src/victory-line';
import Curve from './src/curve';
import styled from 'styled-components';

const TEST_DATA = [
  { x: 1, y: 1 },
  { x: 2, y: 3 },
  { x: 3, y: 2 },
  { x: 4, y: 4 },
];

export default {
  title: 'VictoryLine',
  component: VictoryLine,
} as ComponentMeta<typeof VictoryLine>;

const Template: ComponentStory<typeof VictoryLine> = args => (
  <VictoryLine {...args} />
);

export const Demo = Template.bind({});

Demo.args = {
  data: TEST_DATA,
};

export const WithCustomPath = Template.bind({});

const StyledPath = styled.path`
  fill: none;
  stroke: purple;
`;

WithCustomPath.args = {
  data: TEST_DATA,
  dataComponent: <Curve pathComponent={<StyledPath />} />,
};

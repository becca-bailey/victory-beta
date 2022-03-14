import { ComponentMeta, ComponentStory } from '@storybook/react';
import * as React from 'react';
import styled from 'styled-components';
import { VictoryChart } from '../../packages/victory-chart/src/index';
import Curve from './src/curve';
import VictoryLine from './src/victory-line';

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
  stroke-width: 5;
`;

WithCustomPath.args = {
  data: TEST_DATA,
  dataComponent: <Curve pathComponent={<StyledPath />} />,
};

export const WithMultipleLines = () => {
  return (
    <VictoryChart>
      <VictoryLine data={TEST_DATA} />
      <VictoryLine
        data={[
          { x: 1, y: 5 },
          { x: 3, y: 1 },
        ]}
      />
    </VictoryChart>
  );
};

function generateData(count: number) {
  const data = [];
  for (let i = 0; i < count; i++) {
    data.push({
      x: i,
      y: Math.random() * 10,
    });
  }
  return data;
}

const length = 10;

export const WithAnimation = args => {
  const [data, setData] = React.useState(args.data);
  return (
    <div>
      <VictoryChart>
        <VictoryLine {...args} data={data} />
      </VictoryChart>
      <button onClick={() => setData(generateData(length))}>
        Randomize data
      </button>
    </div>
  );
};

WithAnimation.args = {
  id: 'id',
  animate: true,
  data: generateData(length),
  padding: {
    top: 40,
    bottom: 40,
    left: 10,
    right: 10,
  },
};

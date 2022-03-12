import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import VictoryLine from './src/victory-line';
import Curve from './src/curve';
import styled from 'styled-components';
import {
  useVictoryState,
  VictoryStateProvider,
  VictoryContainer,
} from '@victory/core';

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

export const WithMultipleLines = () => {
  return (
    <VictoryStateProvider>
      <VictoryContainer>
        <VictoryLine id="one" standalone={false} data={TEST_DATA} />
        <VictoryLine
          id="two"
          standalone={false}
          data={[
            { x: 1, y: 5 },
            { x: 3, y: 1 },
          ]}
        />
      </VictoryContainer>
    </VictoryStateProvider>
  );
};

// function generateData(count: number) {
//   const data = [];
//   for (let i = 0; i < count; i++) {
//     data.push({
//       x: i,
//       y: Math.random() * 10,
//     });
//   }
//   return data;
// }

// const length = 10;

// // TODO: This is really clunky
// const VictoryLineWithAnimation = args => {
//   const { setData } = useVictoryState();
//   return (
//     <div>
//       <VictoryContainer>
//         <VictoryLine {...args} />
//       </VictoryContainer>
//       <button onClick={() => setData(generateData(length))}>
//         Randomize data
//       </button>
//     </div>
//   );
// };

// export const WithAnimation = args => {
//   return (
//     <VictoryStateProvider>
//       <VictoryLineWithAnimation {...args} />
//     </VictoryStateProvider>
//   );
// };

// WithAnimation.args = {
//   standalone: false,
//   animate: true,
//   data: generateData(length),
//   padding: {
//     top: 40,
//     bottom: 40,
//     left: 10,
//     right: 10,
//   },
// };

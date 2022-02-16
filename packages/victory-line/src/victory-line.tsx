import * as React from 'react';
import { VictoryContainer } from '@victory/core';

const VictoryLine = () => {
  return (
    <VictoryContainer>
      <foreignObject x={0} y={0} height={100} width={100}>
        Hello World
      </foreignObject>
    </VictoryContainer>
  );
};

export default VictoryLine;

import * as React from 'react';
import { VictoryContainer, VictoryStateProvider } from '@victory/core';
import { CommonProps } from '@victory/core/src/types';
import Curve from './curve';

interface VictoryLineProps extends CommonProps {}

const VictoryLine = ({ data }: VictoryLineProps) => {
  return (
    <VictoryStateProvider data={data}>
      <VictoryContainer>
        <Curve></Curve>
      </VictoryContainer>
    </VictoryStateProvider>
  );
};

export default VictoryLine;

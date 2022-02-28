import * as React from 'react';
import { VictoryContainer, VictoryStateProvider } from '@victory/core';
import { ChartComponentProps } from '@victory/core/src/types';
import Curve from './curve';

interface VictoryLineProps extends ChartComponentProps {}

const VictoryLine = (props: VictoryLineProps) => {
  const { dataComponent = <Curve /> } = props;
  return (
    <VictoryStateProvider {...props}>
      <VictoryContainer>{dataComponent}</VictoryContainer>
    </VictoryStateProvider>
  );
};

export default VictoryLine;

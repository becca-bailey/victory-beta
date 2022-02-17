import * as React from 'react';
import { VictoryContainer } from '@victory/core';
import { CommonProps } from '@victory/core/src/types';
import { useVictoryState } from '@victory/core';
import Curve from './curve';

interface VictoryLineProps extends CommonProps {}

const VictoryLineData = ({ data }: VictoryLineProps) => {
  const { setData } = useVictoryState();

  React.useEffect(() => {
    setData(data);
  }, [data]);

  return <Curve></Curve>;
};

const VictoryLine = (props: VictoryLineProps) => {
  return (
    <VictoryContainer>
      <VictoryLineData {...props}></VictoryLineData>
    </VictoryContainer>
  );
};

export default VictoryLine;

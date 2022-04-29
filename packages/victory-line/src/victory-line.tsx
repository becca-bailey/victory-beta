import { useChartState, useVictoryState, withContainer } from '@victory/core';
import { ChartComponentProps } from '@victory/core/src/types';
import * as React from 'react';
import Curve from './curve';

const VictoryLine = ({
  dataComponent = <Curve />,
  index,
  ...props
}: ChartComponentProps) => {
  const id = React.useMemo(() => {
    return props.id || `victory-line-${index}`;
  }, [props.id, index]);

  const { data } = useChartState(id, props.data);
  const { scale } = useVictoryState();

  return React.cloneElement(dataComponent, {
    data,
    victoryScale: scale,
  });
};

export default withContainer(VictoryLine);

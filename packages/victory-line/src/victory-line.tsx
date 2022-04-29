import {
  useChartData,
  useScale,
  withContainer,
  useAnimationState,
} from '@victory/core';
import { ChartComponentProps } from '@victory/core/src/types';
import * as React from 'react';
import Curve from './curve';

const VictoryLine = ({
  dataComponent = <Curve />,
  data: nextData = [],
  id: idFromProps,
  index,
}: ChartComponentProps) => {
  const id = React.useMemo(() => {
    return idFromProps || `victory-line-${index}`;
  }, [idFromProps, index]);

  const { data, setData } = useChartData(id);
  const { shouldStartAnimating, startTransition } = useAnimationState(id);
  const scale = useScale();

  React.useEffect(() => {
    if (data !== nextData) {
      if (shouldStartAnimating) {
        console.log(shouldStartAnimating);
        startTransition(nextData);
      } else {
        setData(nextData);
      }
    }
  }, [nextData, data, shouldStartAnimating]);

  return React.cloneElement(dataComponent, {
    data,
    victoryScale: scale,
  });
};

export default withContainer(VictoryLine);

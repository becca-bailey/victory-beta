import { useChartData, useScale, withContainer } from '@victory/core';
import { ChartComponentProps } from '@victory/core/src/types';
import * as React from 'react';
import Curve from './curve';

const VictoryLine = ({
  dataComponent = <Curve />,
  data: initialData = [],
  id: idFromProps,
  index,
}: ChartComponentProps) => {
  const id = React.useMemo(() => {
    return idFromProps || `victory-line-${index}`;
  }, [idFromProps, index]);

  const { data, setData } = useChartData(id);
  const scale = useScale();

  React.useEffect(() => {
    setData(initialData);
  }, [initialData]);

  return React.cloneElement(dataComponent, {
    data,
    victoryScale: scale,
  });
};

export default withContainer(VictoryLine);

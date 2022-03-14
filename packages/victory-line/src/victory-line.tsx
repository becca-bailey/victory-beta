import * as React from 'react';
import { useVictoryState, withContainer } from '@victory/core';
import { ChartComponentProps } from '@victory/core/src/types';
import Curve from './curve';

const VictoryLine = ({
  dataComponent = <Curve />,
  data = [],
  id: idFromProps,
  index,
}: ChartComponentProps) => {
  const { getData, setData, scale } = useVictoryState();

  const id = React.useMemo(() => {
    return idFromProps || `victory-line-${index}`;
  }, [idFromProps, index]);

  React.useEffect(() => {
    if (data !== getData(id)) {
      setData(id, data);
    }
  }, [id, data]);

  return React.cloneElement(dataComponent, {
    data: getData(id),
    victoryScale: scale,
  });
};

export default withContainer(VictoryLine);

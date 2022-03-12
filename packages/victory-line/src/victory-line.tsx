import * as React from 'react';
import {
  useVictoryState,
  VictoryContainer,
  VictoryStateProvider,
} from '@victory/core';
import { ChartComponentProps } from '@victory/core/src/types';
import Curve from './curve';

function withContainer(
  WrappedComponent: React.FunctionComponent<ChartComponentProps>
) {
  return (props: ChartComponentProps) => {
    const {
      standalone = true,
      containerComponent = <VictoryContainer />,
      width,
      height,
      padding,
    } = props;
    if (standalone) {
      return (
        <VictoryStateProvider initialState={{ width, height, padding }}>
          {React.cloneElement(
            containerComponent,
            {},
            <WrappedComponent {...props} />
          )}
        </VictoryStateProvider>
      );
    }
    return <WrappedComponent {...props} />;
  };
}

const VictoryLine = ({
  dataComponent = <Curve />,
  data = [],
  id: idFromProps,
  index,
  ...props
}: ChartComponentProps) => {
  const { setData, scale } = useVictoryState();

  const id = React.useMemo(() => {
    return idFromProps || `victory-line-${index}`;
  }, [idFromProps, index]);

  React.useEffect(() => {
    setData(id, data);
  }, []);

  return React.cloneElement(dataComponent, { data, victoryScale: scale });
};

export default withContainer(VictoryLine);

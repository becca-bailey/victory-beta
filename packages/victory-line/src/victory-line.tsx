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
    const { standalone = true, containerComponent = <VictoryContainer /> } =
      props;
    if (standalone) {
      return (
        <VictoryStateProvider>
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
  ...props
}: ChartComponentProps) => {
  const { data, scale, setInitialProps } = useVictoryState();

  React.useEffect(() => {
    setInitialProps(props);
  }, []);

  return React.cloneElement(dataComponent, { data, scaleFns: scale });
};

export default withContainer(VictoryLine);

import React from 'react';
import VictoryStateProvider from './state/victory-state-provider';
import { ChartComponentProps } from './types';
import VictoryContainer from './victory-container';

export function withContainer(
  WrappedComponent: React.FunctionComponent<ChartComponentProps>
) {
  return (props: ChartComponentProps) => {
    const { standalone = true, containerComponent = <VictoryContainer /> } =
      props;
    if (standalone) {
      return (
        <VictoryStateProvider initialProps={props}>
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

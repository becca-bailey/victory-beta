import * as React from 'react';
import { useVictoryState } from '.';
import VictoryStateProvider from './victory-state-provider';

export interface VictoryContainerProps extends React.HTMLProps<SVGElement> {}

const VictoryContainer = ({ children, className }: VictoryContainerProps) => {
  const { width, height } = useVictoryState();
  return (
    <VictoryStateProvider>
      <div className={className}>
        <svg width={width} height={height}>
          {children}
        </svg>
      </div>
    </VictoryStateProvider>
  );
};

export default VictoryContainer;

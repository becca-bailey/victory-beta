import * as React from 'react';
import { useVictoryState } from '.';
import VictoryStateProvider from './victory-state-provider';

export interface VictoryContainerProps extends React.HTMLProps<SVGElement> {}

const VictorySVGContainer: React.FC = ({ children }) => {
  const { width, height } = useVictoryState();
  return (
    <svg width={width} height={height}>
      {children}
    </svg>
  );
};

const VictoryContainer = ({
  children,
  className,
  height = 300,
  width = 450,
}: VictoryContainerProps) => {
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

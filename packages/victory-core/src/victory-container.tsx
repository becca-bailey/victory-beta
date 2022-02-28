import * as React from 'react';
import { useVictoryState } from './redux/victory-state';

export interface VictoryContainerProps extends React.HTMLProps<SVGElement> {}

const VictoryContainer = ({ children, className }: VictoryContainerProps) => {
  const { width, height } = useVictoryState();
  return (
    <div className={className}>
      <svg width={width} height={height}>
        {children}
      </svg>
    </div>
  );
};

export default VictoryContainer;

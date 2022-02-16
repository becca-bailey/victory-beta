import * as React from 'react';

export interface VictoryContainerProps extends React.HTMLProps<SVGElement> {}

const VictoryContainer = ({
  width,
  height,
  children,
}: VictoryContainerProps) => {
  return (
    <svg width={width} height={height}>
      {children}
    </svg>
  );
};

export default VictoryContainer;

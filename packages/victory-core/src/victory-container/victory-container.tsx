import * as React from 'react';

export interface VictoryContainerProps extends React.HTMLProps<SVGElement> {}

const VictoryContainer = ({
  children,
  className,
  height = 300,
  width = 450,
}: VictoryContainerProps) => {
  return (
    <div className={className}>
      <svg width={width} height={height}>
        {children}
      </svg>
    </div>
  );
};

export default VictoryContainer;

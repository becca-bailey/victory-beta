import { withContainer } from '@victory/core';
import * as React from 'react';

const VictoryChart = ({ children }) => {
  return React.Children.map(children, (child, index) => {
    return React.cloneElement(child, {
      standalone: false,
      index,
    });
  });
};

export default withContainer(VictoryChart);

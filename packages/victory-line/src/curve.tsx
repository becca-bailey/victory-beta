import { Path, useVictoryState } from '@victory/core';
import { CommonProps, Coordinates } from '@victory/core/dist/types';
import * as d3 from 'd3';
import * as React from 'react';

interface CurveProps extends CommonProps {
  pathComponent?: React.ReactElement;
}

const Curve = ({ data, pathComponent = <Path /> }: CurveProps) => {
  // const { scale } = useVictoryState();

  // const lineFn = d3
  //   .line<Coordinates>()
  //   .curve(d3.curveNatural)
  //   .x(d => scale.x(d.x))
  //   .y(d => scale.y(d.y));

  return React.cloneElement(pathComponent, {});
};

export default Curve;

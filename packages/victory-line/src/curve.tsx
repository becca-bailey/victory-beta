import { Path, useVictoryState } from '@victory/core';
import { Coordinates, ForAxes, ScaleFn } from '@victory/core/dist/types';
import * as d3 from 'd3';
import * as React from 'react';
import styles from './curve.module.css';

interface CurveProps extends React.SVGProps<SVGPathElement> {
  pathComponent?: React.ReactElement;
  data?: Coordinates[];
  scaleFns?: ForAxes<ScaleFn>;
}

const Curve = ({
  pathComponent = <Path />,
  data = [],
  scaleFns = { x: d3.scaleLinear(), y: d3.scaleLinear() },
  ...rest
}: CurveProps) => {
  const lineFn = d3
    .line<Coordinates>()
    .curve(d3.curveNatural)
    .x(d => scaleFns.x(d.x))
    .y(d => scaleFns.y(d.y));

  return React.cloneElement(pathComponent, {
    d: lineFn(data),
    className: styles.curve,
    ...rest,
  });
};

export default Curve;

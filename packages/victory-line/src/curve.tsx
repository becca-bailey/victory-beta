import { Path } from '@victory/core';
import { Coordinates, ForAxes, ScaleFn } from '@victory/core/dist/types';
import * as d3 from 'd3';
import * as React from 'react';
import styles from './curve.module.css';

interface CurveProps extends React.SVGProps<SVGPathElement> {
  pathComponent?: React.ReactElement;
  data?: Coordinates[];
  // This prop is renamed so it doesn't conflict with the existing SVG path props interface
  victoryScale?: ForAxes<ScaleFn>;
}

const Curve = ({
  pathComponent = <Path />,
  data = [],
  victoryScale = { x: d3.scaleLinear(), y: d3.scaleLinear() },
  ...rest
}: CurveProps) => {
  const lineFn = d3
    .line<Coordinates>()
    .curve(d3.curveNatural)
    .x(d => victoryScale.x(d.x))
    .y(d => victoryScale.y(d.y));

  return React.cloneElement(pathComponent, {
    d: lineFn(data),
    className: styles.curve,
    ...rest,
  });
};

export default Curve;

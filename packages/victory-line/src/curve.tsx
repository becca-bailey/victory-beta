import { Path, useVictoryState } from '@victory/core';
import { CommonProps, Coordinates } from '@victory/core/dist/types';
import * as d3 from 'd3';
import * as React from 'react';
import styles from './curve.module.css';

interface CurveProps extends CommonProps {
  pathComponent?: React.ReactElement;
}

const Curve = ({ pathComponent = <Path /> }: CurveProps) => {
  const { scale, data } = useVictoryState();

  const lineFn = d3
    .line<Coordinates>()
    .curve(d3.curveNatural)
    .x(d => scale.x(d.x))
    .y(d => scale.y(d.y));

  return React.cloneElement(pathComponent, {
    d: lineFn(data),
    className: styles.curve,
  });
};

export default Curve;

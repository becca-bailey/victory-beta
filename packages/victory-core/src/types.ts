import { ScaleLinear } from 'd3-scale';
import React from 'react';

export type ChartData = number;

export type ForAxes<T> = { x: T; y: T };

export type Coordinates = ForAxes<ChartData>;

type OtherData = { [key: string]: any };

export type Datum = Coordinates & OtherData;

export type Padding = {
  top: number;
  bottom: number;
  left: number;
  right: number;
};

export interface ChartComponentProps {
  id?: string;
  data?: Datum[];
  width?: number;
  height?: number;
  padding?: Padding;
  className?: string;
  dataComponent?: React.ReactElement;
  containerComponent?: React.ReactElement;
  standalone?: boolean;
  index?: number;
  children?: React.ReactNode;
}

export type ScaleFn = ScaleLinear<any, any>;

// Rename this
export type Range = [number, number];

export type Scale = ForAxes<ScaleFn>;

export type StateType = {
  width: number;
  height: number;
  data: { [key: string]: Datum[] };
  padding: Padding;
};

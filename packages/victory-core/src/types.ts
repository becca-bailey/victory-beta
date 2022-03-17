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

export type AnimatePropType = {
  duration: number;
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
  scale?: ForAxes<ScaleFn>;
  range?: ForAxes<Extent>;
  domain?: ForAxes<Extent>;
  animate?: boolean | AnimatePropType;
}

export type ScaleFn = ScaleLinear<any, any>;

// Rename this
export type Extent = [number, number];

export type Scale = ForAxes<ScaleFn>;

export type ChartState = {
  data: Datum[];
  animating: boolean;
};

export type StateType = {
  width: number;
  height: number;
  padding: Padding;
  chartStates: { [key: string]: ChartState };
};

export type ContextType = {
  width: number;
  height: number;
  padding: Padding;
  range: ForAxes<Extent>;
  domain: ForAxes<Extent>;
  scale: ForAxes<ScaleFn>;
  animate: AnimatePropType | undefined;
  setData: (id: string, data: Datum[]) => void;
  getData: (id: string) => Datum[];
};

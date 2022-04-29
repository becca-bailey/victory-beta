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

export type InterpolationOptions =
  | 'basis'
  | 'basisClosed'
  | 'basisOpen'
  | 'bundle'
  | 'cardinal'
  | 'cardinalClosed'
  | 'cardinalOpen'
  | 'catmullRom'
  | 'catmullRomClosed'
  | 'catmullRomOpen'
  | 'linear'
  | 'linearClosed'
  | 'monotoneX'
  | 'monotoneY'
  | 'natural'
  | 'radial'
  | 'step'
  | 'stepAfter'
  | 'stepBefore';

export interface ChartComponentProps {
  animate?: boolean | AnimatePropType;
  children?: React.ReactNode;
  className?: string;
  containerComponent?: React.ReactElement;
  data?: Datum[];
  dataComponent?: React.ReactElement;
  domain?: ForAxes<Extent>;
  groupComponent?: React.ReactElement;
  id?: string;
  index?: number;
  interpolation?: InterpolationOptions | Function;
  height?: number;
  padding?: Padding;
  range?: ForAxes<Extent>;
  scale?: ForAxes<ScaleFn>;
  standalone?: boolean;
  width?: number;
}

export type ScaleFn = ScaleLinear<any, any>;

// Rename this
export type Extent = [number, number];

export type Scale = ForAxes<ScaleFn>;

export type AnimationState = {
  animating?: boolean;
  previousData?: Datum[];
  nextData?: Datum[];
  duration?: number;
};

export type ChartState = AnimationState & {
  data: Datum[];
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
  getState: (id: string) => ChartState;
  startTransition: (id: string, data: Datum[]) => void;
  endTransition: (id: string) => void;
  shouldStartAnimating: (id: string) => boolean;
  isAnimating: (id: string) => boolean;
};

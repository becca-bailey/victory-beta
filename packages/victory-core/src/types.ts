import { ScaleLinear } from 'd3-scale';

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

export interface CommonProps {
  data?: Datum[];
  width?: number;
  height?: number;
  padding?: Padding;
}

type ScaleFn = ScaleLinear<any, any>;

// Rename this
export type Range = [number, number];

export type Scale = ForAxes<ScaleFn>;

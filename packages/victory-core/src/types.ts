import { ScaleLinear } from 'd3-scale';

export type ChartData = number;

export type Coordinates = {
  x: ChartData;
  y: ChartData;
};

type OtherData = { [key: string]: any };

export type Datum = Coordinates & OtherData;

export interface CommonProps {
  data?: Datum[];
}

type ScaleFn = ScaleLinear<any, any>;

export type Scale = { x: ScaleFn; y: ScaleFn };

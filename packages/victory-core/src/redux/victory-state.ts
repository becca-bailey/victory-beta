import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as d3 from 'd3';
import { useDispatch, useSelector } from 'react-redux';
import {
  ChartComponentProps,
  Coordinates,
  Datum,
  ForAxes,
  Range,
  ScaleFn,
} from '../types';

import * as React from 'react';

export interface StateType {
  chart: ChartComponentProps;
}

export const chartSlice = createSlice({
  name: 'chart',
  initialState: {
    isAnimating: false,
    animate: false,
    previousData: [],
    nextData: [],
    data: [],
    width: 450,
    height: 300,
    padding: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
  },
  reducers: {
    setData: (state, action: PayloadAction<Coordinates[]>) => {
      state.data = action.payload;
    },
    setInitialProps: (state, action: PayloadAction<ChartComponentProps>) => {
      const updatedState = { ...state, ...action.payload };
      return updatedState;
    },
  },
});

export function useVictoryState() {
  const dispatch = useDispatch();

  const {
    animate,
    width,
    height,
    data: dataFromState,
  } = useSelector((state: StateType) => state.chart);

  function setInitialProps(props: ChartComponentProps) {
    dispatch(chartSlice.actions.setInitialProps(props));
  }

  function setData(data: Datum[]) {
    dispatch(chartSlice.actions.setData(data));
  }

  const data = useSelector<StateType, Datum[]>(state => {
    return state.chart.data;
  });

  const domain = useSelector<StateType, ForAxes<Range>>(state => {
    const { data } = state.chart;
    return {
      x: d3.extent(data.map(({ x }) => x)),
      y: d3.extent(data.map(({ y }) => y)),
    };
  });

  const range = useSelector<StateType, ForAxes<Range>>(state => {
    const { padding, height, width } = state.chart;
    return {
      x: [padding.left, width - padding.right],
      y: [height - padding.bottom, padding.top],
    };
  });

  const scale = useSelector<StateType, ForAxes<ScaleFn>>(state => {
    // TODO: Get this from props or data

    return {
      x: d3.scaleLinear().domain(domain.x).range(range.x),
      y: d3.scaleLinear().domain(domain.y).range(range.y),
    };
  });

  return {
    animate,
    width,
    height,
    setInitialProps,
    setData,
    domain,
    range,
    scale,
    data,
  };
}

export const store = configureStore({
  reducer: {
    chart: chartSlice.reducer,
  },
});

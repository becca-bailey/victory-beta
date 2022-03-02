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
  initialProps: ChartComponentProps;
}

export const initialPropsSlice = createSlice({
  name: 'initialProps',
  initialState: {
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

  const initialProps = useSelector((state: StateType) => state.initialProps);

  function setInitialProps(props: ChartComponentProps) {
    dispatch(initialPropsSlice.actions.setInitialProps(props));
  }

  function setData(data: Datum[]) {
    dispatch(initialPropsSlice.actions.setData(data));
  }

  const data = useSelector<StateType, Datum[]>(state => {
    return state.initialProps.data;
  });

  const domain = useSelector<StateType, ForAxes<Range>>(state => {
    const { data } = state.initialProps;
    return {
      x: d3.extent(data.map(({ x }) => x)),
      y: d3.extent(data.map(({ y }) => y)),
    };
  });

  const range = useSelector<StateType, ForAxes<Range>>(state => {
    const { padding, height, width } = state.initialProps;
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
    setInitialProps,
    setData,
    domain,
    range,
    scale,
    data,
    ...initialProps,
  };
}

export const store = configureStore({
  reducer: {
    initialProps: initialPropsSlice.reducer,
  },
});

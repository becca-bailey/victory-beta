import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as d3 from 'd3';
import { useDispatch, useSelector } from 'react-redux';
import {
  CommonProps,
  Coordinates,
  Datum,
  ForAxes,
  Range,
  ScaleFn,
} from '../types';

import * as React from 'react';

export interface StateType {
  initialProps: CommonProps;
}

const initialState: CommonProps = {
  data: [],
};

export const initialPropsSlice = createSlice({
  name: 'initialProps',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<Coordinates[]>) => {
      state.data = action.payload;
    },
  },
});

export function useInitialProps() {
  return useSelector((state: StateType) => state.initialProps);
}

export function useVictoryState() {
  const dispatch = useDispatch();

  function setData(data: Datum[]) {
    dispatch(initialPropsSlice.actions.setData(data));
  }

  const data = useSelector<StateType, Datum[]>(
    state => state.initialProps.data
  );

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
    setData,
    domain,
    range,
    scale,
    data,
  };
}

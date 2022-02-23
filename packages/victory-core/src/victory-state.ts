import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as d3 from 'd3';
import { useDispatch, useSelector } from 'react-redux';
import { CommonProps, Coordinates, Datum, ForAxes, Range } from './types';

export interface DataState {
  data: Datum[];
}

interface StateType {
  data: DataState;
  props: CommonProps;
}

const dataSlice = createSlice({
  name: 'data',
  initialState: { data: [] },
  reducers: {
    setData: (state, action: PayloadAction<Coordinates[]>) => {
      state.data = action.payload;
    },
  },
});

const propsSlice = createSlice({
  name: 'props',
  initialState: {
    width: 450,
    height: 300,
    padding: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
  },
  reducers: {},
});

export const store = configureStore({
  reducer: {
    data: dataSlice.reducer,
    props: propsSlice.reducer,
  },
});

export function useVictoryState() {
  const dispatch = useDispatch();

  function setData(data: Datum[]) {
    dispatch(dataSlice.actions.setData(data));
  }

  const width = useSelector<StateType, number>(state => state.props.width);
  const height = useSelector<StateType, number>(state => state.props.height);
  const data = useSelector<StateType, Datum[]>(state => state.data.data);

  const domain = useSelector<StateType, ForAxes<Range>>(state => {
    const { data } = state.data;
    return {
      x: d3.extent(data.map(({ x }) => x)),
      y: d3.extent(data.map(({ y }) => y)),
    };
  });

  const range = useSelector<StateType, ForAxes<Range>>(state => {
    const { padding, height, width } = state.props;
    return {
      x: [padding.left, width],
      // Fix this
      y: [height, padding.right],
    };
  });

  return { setData, domain, width, height, range, data };
}

import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { ChartData, Coordinates, Datum, Scale } from './types';
import * as d3 from 'd3';

// Is there a way to provide a user-friendly error message if a user uses a custom container component
// and doesn't include this state provider?
type Domain = {
  x: ChartData[];
  y: ChartData[];
};

export interface DataState {
  domain: Domain;
  width: number;
  height: number;
}

interface StateType {
  data: DataState;
}

const INITIAL_DATA_STATE: DataState = {
  domain: {
    x: [],
    y: [],
  },
  width: 450,
  height: 300,
};

const dataSlice = createSlice({
  name: 'data',
  initialState: INITIAL_DATA_STATE,
  reducers: {
    setData: (state, action: PayloadAction<Coordinates[]>) => {
      // Handle domain from props
      const xValues = action.payload.map(datum => datum.x);
      const yValues = action.payload.map(datum => datum.y);
      state.domain = {
        x: state.domain.x.concat(xValues),
        y: state.domain.x.concat(yValues),
      };
    },
  },
});

export const store = configureStore({
  reducer: {
    data: dataSlice.reducer,
  },
});

export function useVictoryState() {
  const dispatch = useDispatch();

  function setData(data: Datum[]) {
    dispatch(dataSlice.actions.setData(data));
  }

  const domain = useSelector<StateType, Domain>(state => state.data.domain);
  const width = useSelector<StateType, number>(state => state.data.width);
  const height = useSelector<StateType, number>(state => state.data.height);

  const scale = useSelector<StateType, Scale>(state => {
    const domain = state.data.domain;
    const width = state.data.width;
    const height = state.data.height;
    const xScale = d3
      .scaleLinear()
      .domain(d3.extent(domain.x))
      .range([0, width]);
    const yScale = d3
      .scaleLinear()
      .domain(d3.extent(domain.y))
      .range([height, 0]);

    return {
      x: xScale,
      y: yScale,
    };
  });

  return { setData, domain, width, height, scale };
}
